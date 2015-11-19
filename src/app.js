import {SurveyListView} from './survey/list/index'
import {SurveyViewView} from './survey/view/index'
import {DashboardView} from './dashboard/index'

export class App {
	static start(container) {
		const app = new App(container)

		app.loop()

		return app
	}

	constructor(container) {
		this.container = container
	}

	loop() {
		let prevHash = window.location.hash

		this.route(prevHash)

		window.setInterval(() => {
			if (window.location.hash != prevHash) {
				prevHash = window.location.hash
				this.route(prevHash)
			}
		}, 100)
	}

	route(hash) {
		hash = hash.replace('#', '')

		if (hash === '') {
			this.attach(SurveyListView, 'survey')
		} else if (hash === 'dashboard') {
			this.attach(SurveyListView, 'dashboard')
		} else if (/^dashboard\/\d+$/.test(hash)) {
			const survey_id = parseInt(/(\d+)/.exec(hash)[1], 10)
			this.attach(DashboardView, survey_id)
		} else if (/^survey\/\d+$/.test(hash)) {
			const survey_id = parseInt(/(\d+)/.exec(hash)[1], 10)
			this.attach(SurveyViewView, survey_id)
		} else {
			this.container.innerHTML = `404 - ${hash}`
		}
	}

	attach(ViewType, ...rest) {
		this.container.innerHTML = ViewType.template ? ViewType.template() : ''
		this.view = new ViewType(this.container, ...rest)
	}
}