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

		this.el.appendChild(docfrag)
	}

	renderQuestion(question) {

	}
}