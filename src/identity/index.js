import {SessionHelper} from '../session'

export class IdentityView {
    static template() {
        return `
	        <style type="text/css">
				body {
				  padding-top: 40px;
				  padding-bottom: 40px;
				}
				.form-signin {
				  max-width: 330px;
				  padding: 15px;
				  margin: 0 auto;
				}
				.form-signin .form-signin-heading,
				  margin-bottom: 10px;
				}
				.form-signin .form-control {
				  position: relative;
				  height: auto;
				  -webkit-box-sizing: border-box;
				     -moz-box-sizing: border-box;
				          box-sizing: border-box;
				  padding: 10px;
				  font-size: 16px;
				}
				.form-signin .form-control:focus {
				  z-index: 2;
				}
				.form-signin input[type="text"] {
				  margin-bottom: -1px;
				  border-bottom-right-radius: 0;
				  border-bottom-left-radius: 0;
				}
				.form-signin button[type="submit"] {
				  margin-bottom: -1px;
				  border-top-right-radius: 0;
				  border-top-left-radius: 0;
				}
	        </style>

<form class="form-signin">
	<h2 class="form-signin-heading">Please identify yourself</h2>
	<label for="inputEmail" class="sr-only">Identity</label>
	<input type="text" id="identity" name="identity" class="form-control" placeholder="Aaron A. Aaronson" required="" autofocus="">
	<button class="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
</form>
		`
    }

    constructor(el) {
        this.el = el
    }

    ready() {
    	this.el.querySelector('form').onsubmit = event => {
    		event.preventDefault()
    		SessionHelper.id(event.target.elements.identity.value)
    		window.location.hash = '#'
    	}
    }
}