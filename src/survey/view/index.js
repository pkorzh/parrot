import {SessionHelper} from '../../session'

export class SurveyViewView {
	constructor(el, survey_id) {
		this.el = el
		
		fetch(`http://localhost:3000/questions?survey_id=${survey_id}`)
			.then(response => response.json())
			.then(questions => this.renderQuestions(questions))
	}

	renderQuestions(questions) {
		const docfrag = document.createDocumentFragment()

		questions
			.map(question => this.renderQuestion(question))
			.map(questionEl => docfrag.appendChild(questionEl))

		this.el.appendChild(docfrag)
	}

	renderQuestion(question) {
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

		question.answerOptions
			.map(answerOption => this.renderAnswerOption(answerOption, question))
			.map(answerOptionEl => qAnswerOptionsEl.appendChild(answerOptionEl))

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
			Array.from(this.el.querySelectorAll(`.question-group-${question.id} > .list-group-item`)).forEach(el => {
				el.classList.remove('active')
			})

			a.classList.add('active')

			this.postVote(answerOption, question)

			event.preventDefault()
		}

		return a
	}

	postVote(answerOption, question) {
		console.log(SessionHelper.id())
	}
}