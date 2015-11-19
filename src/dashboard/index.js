export class DashboardView {
	constructor(el, survey_id) {
		this.el = el

		fetch(`http://localhost:3000/surveys/${survey_id}?_embed=questions`)
			.then(response => response.json())
			.then(json => {
				const h1 = document.createElement('h1')
				h1.innerHTML = json.name

				this.el.appendChild(h1)

				return json
			}).then(json => {
			})
	}
}