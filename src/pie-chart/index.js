export class PieChartView {
	constructor(el) {
		this.canvas = el
		this.context = this.canvas.getContext('2d')

		this.center = [this.canvas.width / 2, this.canvas.height / 2]
		this.radius = Math.min(this.canvas.width, this.canvas.height) / 2
	}

	draw(data) {
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)

		this.lastPosition = 0

		this.total = 0
		
		data.forEach(item => this.total += item.data)
		data.forEach(item => this.renderArc(item))
	}

	renderArc(item) {
		this.context.fillStyle = item.color

		this.context.beginPath()

		this.context.moveTo(this.center[0], this.center[1])

		this.context.arc(
			this.center[0],
			this.center[1],
			this.radius,
			this.lastPosition,
			this.lastPosition + (Math.PI * 2 * (item.data / this.total)),
			false
		)

		this.context.closePath()

		this.context.lineTo(this.center[0], this.center[1]);

		this.context.fill()

		this.lastPosition += Math.PI * 2 * (item.data / this.total)
	}
}