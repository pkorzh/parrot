import {SurveyListView} from './survey/list/index'
import {SurveyViewView} from './survey/view/index'


const link = document.createElement('link')
link.href = 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css'
link.type = 'text/css'
link.rel = 'stylesheet'
document.getElementsByTagName('head')[0].appendChild(link)


const viewport = document.createElement('div')
viewport.classList.add('viewport')
document.body.appendChild(viewport)


const attachToViewPort = (View, ...rest) => {
	viewport.innerHTML = View.template ? View.template() : ''
	new View(viewport, ...rest)
}

const ruleThemAll = hash => {
	hash = hash.replace('#', '')

	if (hash == '') {
		attachToViewPort(SurveyListView)

	} else if (/\d+/.test(hash)) {
		attachToViewPort(SurveyViewView, parseInt(hash, 10))

	} else {
		viewport.innerHTML = '404'
	}
}


let prevHash = window.location.hash

ruleThemAll(prevHash)

window.setInterval(() => {
	if (window.location.hash != prevHash) {
		prevHash = window.location.hash
		ruleThemAll(prevHash)
	}
}, 100)