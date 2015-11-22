import {PieChartView} from '../pie-chart/index'
import {SessionHelper} from '../session'

const colors = ['#7E3817', '#C35817', '#EE9A4D', '#A0C544', '#348017', '#307D7E']

export class DashboardView {
	constructor(el, survey_id) {
		this.el = el
		this.survey_id = survey_id

		fetch(`http://localhost:3000/surveys/${survey_id}?_embed=questions`)
			.then(response => response.json())
			.then(survey => {
				const h1 = document.createElement('h1')
				h1.innerHTML = survey.name

				this.el.appendChild(h1)

				const docfrag = document.createDocumentFragment()

				survey.questions
					.map(question => this.renderQuestion(question, survey))
					.map(questionEl => docfrag.appendChild(questionEl))

				this.el.appendChild(docfrag)
			})
	}

	renderQuestion(question, survey) {
		const docfrag = document.createDocumentFragment()

		const qEl = document.createElement('div')
		qEl.classList.add('panel-default')
		qEl.classList.add('panel')
		docfrag.appendChild(qEl)

		const qHeadingEl = document.createElement('div')
		qHeadingEl.classList.add('panel-heading')
		qHeadingEl.innerHTML = question.question
		qEl.appendChild(qHeadingEl)

		const qBody = document.createElement('div')
		qBody.classList.add('panel-body')
		qEl.appendChild(qBody)

		qBody.appendChild(this.renderPieChart(question, survey))

		return docfrag
	}

	renderPieChart(question) {
		const pcEl = document.createElement('canvas')
		const pcView = new PieChartView(pcEl)

		setInterval(_ => {
			fetch(`http://localhost:3000/answers?questionId=${question.id}&surveyId=${this.survey_id}`)
				.then(response => response.json())
				.then(answers => {
					answers = answers.reduce((acc, answer) => {
						const g = acc[answer.answerOptionId] || (acc[answer.answerOptionId] = [])
						g.push(answer)
						return acc
					}, {})

					answers = Object.keys(answers).map((answerOptionId, index) => {
						return {
							data: answers[answerOptionId].length,
							color: colors[index]
						}
					})

					pcView.draw(answers)
				})
		}, 2000)

		return pcEl
	}
}