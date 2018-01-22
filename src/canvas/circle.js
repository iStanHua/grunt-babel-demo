class Circle {
    constructor(canvas, max, value, text) {
        this.ctx = canvas.getContext('2d')
        this.width = canvas.width
        this.height = canvas.height
        this.x = canvas.width / 2
        this.y = canvas.height / 2
        this.radius = canvas.width / 3
        this.max = max
        this.value = value
        this.text = text
        this.speed = value / 8
    }
    init() {
        this.drawOuterCircle()
        this.drawText()
        this.tick()
    }
    drawOuterCircle() {
        this.ctx.save()
        this.ctx.beginPath()
        this.ctx.lineWidth = 20
        this.ctx.strokeStyle = '#fff'
        this.ctx.shadowBlur = 10
        this.ctx.shadowColor = 'rgba(0,0,0,.18)'
        this.ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI)
        this.ctx.stroke()
        this.ctx.restore()
    }

    drawInnerCircle(value) {
        this.ctx.beginPath()
        this.ctx.lineCap = 'round'
        this.ctx.lineWidth = 20
        this.ctx.strokeStyle = '#2d8cf0'
        this.ctx.arc(this.x, this.y, this.radius, -Math.PI / 2, -Math.PI / 2 + value / this.max * Math.PI * 2)
        this.ctx.stroke()
        this.drawValue()
    }

    drawText() {
        this.ctx.save()
        this.ctx.beginPath()
        this.ctx.font = '.32rem Arial'
        this.ctx.fillStyle = '#333'
        this.ctx.textAlign = 'center'
        this.ctx.fillText(this.text, this.x, this.y + 30, this.width)
        this.ctx.stroke()
        this.ctx.restore()
    }

    drawValue() {
        this.ctx.save()
        this.ctx.beginPath()
        this.ctx.fillStyle = '#2d8cf0'
        this.ctx.font = '.3rem Arial'
        this.ctx.textAlign = 'center'
        this.ctx.clearRect(this.x - this.radius / 2, this.y - this.radius / 2, this.radius, 68)
        this.ctx.fillText(this.speed, this.x, this.y - 30)
        this.ctx.stroke()
        this.ctx.restore()
    }

    tick() {
        this.timer = window.requestAnimationFrame(this.tick.bind(this))
        this.drawInnerCircle(this.speed)
        if (this.speed < this.value) {
            this.speed++
        }
        else {
            this.speed = this.value
            window.cancelAnimationFrame(this.timer)
        }
    }
}

window.onload = () => {
    var circle = new Circle(document.getElementById('gameCanvas'), 1000, 200, '机位')
    circle.init()
}