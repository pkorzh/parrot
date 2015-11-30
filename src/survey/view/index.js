import {SessionHelper} from '../../session'

export class SurveyViewView {
	constructor(el, survey) {
		this.el = el
		
		const h1 = document.createElement('h1')
		h1.innerHTML = survey.name
		this.el.appendChild(h1)

		const h2 = document.createElement('h2')
		h2.innerHTML = ''
		this.el.appendChild(h2)

		const questionPlaceholder = document.createElement('div')
		this.el.appendChild(questionPlaceholder)

		const startEl = document.createElement('button')
		startEl.innerHTML = 'Start test'
		startEl.classList.add('btn')
		startEl.classList.add('btn-default')
		startEl.classList.add('btn-block')
		startEl.onclick = _ => {
			this.nextQuestion()
		}

		questionPlaceholder.appendChild(startEl)

		survey.questions.forEach(question => {
			question.time = question.time || 1 * 60 * 1000
		})

		const totalQuestions = survey.questions.length

		this.nextQuestion = () => {
			this.nextQuestion.timeoutId ? clearTimeout(this.nextQuestion.timeoutId) : void 0

			const question = survey.questions.shift()

			questionPlaceholder.innerHTML = ''

			if (!question) {
				this.renderFinish()
			} else {
				h2.innerHTML = `Question ${totalQuestions - survey.questions.length} of ${totalQuestions}`

				questionPlaceholder.appendChild(this.renderQuestion(question))

				this.nextQuestion.timeoutId = setTimeout(_ => {
					this.nextQuestion()
				}, question.time)
			}
		}
	}

	renderFinish() {
		const h1 = document.createElement('h1')
		h1.innerHTML = 'Survey finished'

		this.el.appendChild(h1)
	}

	renderQuestion(question) {
		this.renderQuestion.timeoutId ? clearTimeout(this.renderQuestion.timeoutId) : void 0

		const docfrag = document.createDocumentFragment()

		const qEl = document.createElement('div')
		qEl.classList.add('panel-default')
		qEl.classList.add('panel')
		docfrag.appendChild(qEl)

		const qHeadingEl = document.createElement('div')
		qHeadingEl.classList.add('panel-heading')
		qHeadingEl.innerHTML = question.question
		qEl.appendChild(qHeadingEl)

		const qAnswerOptionsEl = document.createElement('div')
		qAnswerOptionsEl.classList.add('list-group')
		qAnswerOptionsEl.classList.add(`question-group-${question.id}`)
		qEl.appendChild(qAnswerOptionsEl)

		const qFooterEl = document.createElement('div')
		qFooterEl.classList.add('panel-footer')
		qEl.appendChild(qFooterEl)

		const aoEls =  question.answerOptions
			.map(answerOption => this.renderAnswerOption(answerOption, question))
			.map(answerOptionEl => {
				qAnswerOptionsEl.appendChild(answerOptionEl)
				return answerOptionEl
			})

		this.renderQuestion.timeoutId = setTimeout(_ => {
			aoEls.forEach(el => el.style.color = 'red')
		}, Math.floor(question.time / 3 * 2))

		return docfrag
	}

	renderAnswerOption(answerOption, question) {
		const a = document.createElement('a')
		const linkText = document.createTextNode(answerOption.answerOption)

		a.appendChild(linkText)
		a.title = answerOption.answerOption
		a.href = `#${question.id}__${answerOption.id}`
		a.classList.add('list-group-item')

		a.onclick = event => {
			event.preventDefault()

			if (!a.classList.contains('active')) {
				Array.from(this.el.querySelectorAll(`.question-group-${question.id} > .list-group-item`)).forEach(el => {
					el.classList.remove('active')
				})

				a.classList.add('active')

				this.postVote(answerOption, question)
			}
		}

		return a
	}

	postVote(answerOption, question) {
		fetch('http://localhost:3000/answers', {
			method: 'post',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				sessionId: SessionHelper.id(),
				timestamp: Date.now() / 1000 | 0,
				questionId: question.id,
				answerOptionId: answerOption.id,
				surveyId: this.survey_id
			})
		}).then(this.nextQuestion.bind(this))
	}
}