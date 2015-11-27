export class ListGroupView {
	static template() {
		return `
			<div class="list-group">
			</div>
		`
	}

	constructor(el, urlPrefix = '', data = []) {
		this.el = el

		this.renderList(data, urlPrefix)
	}

	renderList(data, urlPrefix) {
		const docfrag = document.createDocumentFragment()

		data
			.map(item => this.renderListItem(item, urlPrefix))
			.map(itemEl => docfrag.appendChild(itemEl))

		this.el.querySelector('.list-group').appendChild(docfrag)
	}

	renderListItem(item, urlPrefix) {
		const a = document.createElement('a')
		const linkText = document.createTextNode(item.name)

		a.appendChild(linkText)
		a.title = item.name
		a.href = `#${urlPrefix}/${item.id}`
		a.classList.add('list-group-item')

		return a
	}
}