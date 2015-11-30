import {
    ListGroupView
}
from './list-group/index'
import {
    SurveyViewView
}
from './survey/view/index'
import {
    DashboardView
}
from './dashboard/index'
import {
    IdentityView
}
from './identity/index'
import {
    SessionHelper
}
from './session'

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
        this.route()

        window.addEventListener('hashchange', this.route.bind(this), false)
    }

    route() {
        const hash = window.location.hash.replace('#', '')

        if (!SessionHelper.id() && hash !== 'identity') {
            window.location.hash = '#identity'
            return
        }

        if (hash === '') {

            fetch('http://localhost:3000/surveys')
                .then(response => response.json())
                .then(surveys => {
                    this.attach(ListGroupView, 'survey', surveys)
                })

        } else if (hash === 'identity') {

            this.attach(IdentityView)

        } else if (hash === 'dashboard') {

            fetch('http://localhost:3000/surveys')
                .then(response => response.json())
                .then(surveys => {
                    this.attach(ListGroupView, 'dashboard', surveys)
                })

        } else if (/^dashboard\/\d+$/.test(hash)) {

            const survey_id = parseInt(/(\d+)/.exec(hash)[1], 10)

            fetch(`http://localhost:3000/surveys/${survey_id}?_embed=questions`)
                .then(response => response.json())
                .then(survey => {
                    this.attach(DashboardView, survey)
                })

        } else if (/^survey\/\d+$/.test(hash)) {

            const survey_id = parseInt(/(\d+)/.exec(hash)[1], 10)

            fetch(`http://localhost:3000/surveys/${survey_id}?_embed=questions`)
                .then(response => response.json())
                .then(survey => {
                    this.attach(SurveyViewView, survey)
                })

        } else {

            this.container.innerHTML = `404 - ${hash}`

        }
    }

    attach(ViewType, ...rest) {
        this.container.innerHTML = ViewType.template ? ViewType.template() : ''
        this.view = new ViewType(this.container, ...rest)

        if (typeof this.view.ready === 'function') {
            this.view.ready()
        }
    }
}