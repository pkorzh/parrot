import {App} from './app'

const link = document.createElement('link')
link.href = 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css'
link.type = 'text/css'
link.rel = 'stylesheet'
document.getElementsByTagName('head')[0].appendChild(link)


App.start(document.querySelector('.container'))