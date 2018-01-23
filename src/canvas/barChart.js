class BarChart {
    constructor(canvas, data) {
        this.ctx = canvas.getContext('2d')
        this.width = canvas.width
        this.height = canvas.height
        this.data = data
        this.length = data.length
        this.points = this._getPoint()
        this.gap = 8
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
        let points = this._getPoint()

        for (let i = 0; i < this.length; i++) {
            const p = this.points[i]
            this.ctx.fillStyle = '#2d8cf0'
            this.ctx.fillRect(p.x - this.gap, p.y, this.gap * 2, this.height - p.y)
            this.ctx.fill()

        }
    }
}

window.onload = () => {
    let data = [1000, 800, 2000, 500, 666, 1200, 1600, 1500, 1700, 1900]
    let barChart = new BarChart(document.getElementById('gameCanvas'), data)
    barChart.init()
}