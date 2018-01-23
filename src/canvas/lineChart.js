class LineChart {
    constructor(canvas, data) {
        this.ctx = canvas.getContext('2d')
        this.width = canvas.width
        this.height = canvas.height
        this.data = data
        this.length = data.length
        this.points = this._getPoint()
    }
    init() {
        this.render()
    }

    _getMax() {
        return Math.max.apply(Math, this.data) * 1.0
    }

    _getPoint() {
        let point = []
        let cellWidth = this.width / (this.length + 1)
        let max = this._getMax()
        max = max > 100 ? max + max / 3 : 100
        for (let i = 0; i < this.length; i++) {
            const v = this.data[i]
            let x = cellWidth * (i + 1)
            let y = this.height - this.height * (v / max)
            point.push({ x: x, y: y })
        }
        return point
    }

    render() {
        this.ctx.beginPath()
        this.ctx.moveTo(this.points[0].x, this.points[0].y)
        for (let i = 0; i < this.length; i++) {
            const p = this.points[i]
            // 绘制折现
            this.ctx.lineJoin = 'round'
            this.ctx.lineWidth = 2
            this.ctx.strokeStyle = '#2d8cf0'
            this.ctx.lineTo(p.x, p.y)
            this.ctx.stroke()

        }
        this.ctx.closePath()

        for (let i = 0; i < this.length; i++) {
            const p = this.points[i]

            // 绘制点
            this.ctx.beginPath()
            this.ctx.fillStyle = '#2d8cf0'
            this.ctx.arc(p.x, p.y, 6, 0, Math.PI * 2)
            this.ctx.fill()
        }
    }
}

window.onload = () => {
    let data = [501, 501, 437, 500, 468, 1000, 2000, 2110, 1800, 1800, 1600, 1400, 1400, 1500, 1600, 1400, 1500, 1700, 1900]
    let lineChart = new LineChart(document.getElementById('gameCanvas'), data)
    lineChart.init()
}