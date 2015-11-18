import tmpl from './list.html!'

export class SurveyListView {
	static template() {
		return tmpl
	}

	constructor(el) {
		this.el = el

		fetch('http://localhost:3000/surveys')
			.then(response => response.json())
			.then(surveys => this.renderSurveys(surveys))
	}

	renderSurveys(surveys) {
		const docfrag = document.createDocumentFragment()

		surveys
			.map(survey => this.renderSurvey(survey))
			.map(surveyEl => docfrag.appendChild(surveyEl))

		this.el.querySelector('.survey-list-group').appendChild(docfrag)
	}

	renderSurvey(survey) {
		const a = document.createElement('a')
		const linkText = document.createTextNode(survey.name)

		a.appendChild(linkText)
		a.title = survey.name
		a.href = `#${survey.id}`
		a.classList.add('list-group-item')

		return a
	}
}