export class SurveyListView {
	static template() {
		return `
			<div class="list-group survey-list-group">
			</div>
		`
	}

	constructor(el, urlPrefix = '') {
		this.el = el
		this.urlPrefix = urlPrefix

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
		a.href = `#${this.urlPrefix}/${survey.id}`
		a.classList.add('list-group-item')

		return a
	}
}