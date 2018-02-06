class Curve {
    constructor(canvas) {
        this.ctx = canvas.getContext('2d')
        this.width = canvas.width
        this.height = canvas.height

        this.x = canvas.width / 2
        this.y = canvas.height / 2
        this.radius = canvas.height / 2

        this.count = 80
        this.colors = []
        this.percent = 0

        this._setColors()
    }

    /**
     * 生成随机颜色
     */
    _setColors() {
        for (let i = 0; i < this.count; i++) {
            this.colors.push(
                'rgb( ' +
                (Math.random() * 255 >> 0) + ',' +
                (Math.random() * 255 >> 0) + ',' +
                (Math.random() * 255 >> 0) +
                ' )'
            )
        }
    }
    /**
     * 
     * @param {Array} start 
     * @param {Array} end 
     * @param {Number} curveness 
     */
    _drawCurvePath(start, end, curveness) {
        let cp = [
            (start[0] + end[0]) / 2 - (start[1] - end[1]) * curveness,
            (start[1] + end[1]) / 2 - (end[0] - start[0]) * curveness,
        ]

        let t = this.percent / 100
        let p0 = start
        let p1 = cp
        let p2 = end

        let v01 = [p1[0] - p0[0], p1[1] - p0[1]]  // 向量<p0, p1>
        let v12 = [p2[0] - p1[0], p2[1] - p1[1]]  // 向量<p1, p2>

        let q0 = [p0[0] + v01[0] * t, p0[1] + v01[1] * t]
        let q1 = [p1[0] + v12[0] * t, p1[1] + v12[1] * t]

        let v = [q1[0] - q0[0], q1[1] - q0[1]]      // 向量<q0, q1>

        let b = [q0[0] + v[0] * t, q0[1] + v[1] * t]

        this.ctx.moveTo(p0[0], p0[1])
        this.ctx.quadraticCurveTo(
            q0[0], q0[1],
            b[0], b[1]
        )
    }

    tick() {
        this.ctx.clearRect(0, 0, this.width, this.height)

        for (let i = 0; i < this.count; i++) {
            let angle = Math.PI * 2 / this.count * i
            let x = this.x + this.radius * Math.sin(angle)
            let y = this.y + this.radius * Math.cos(angle)

            this.ctx.strokeStyle = this.colors[i]
            this.ctx.beginPath()
            this._drawCurvePath([this.x, this.y], [x, y], 0.4)
            this.ctx.stroke()
        }
        this.percent = (this.percent + 1) % 100
        requestAnimationFrame(this.tick.bind(this))
    }
}

window.onload = () => {
    let curve = new Curve(document.getElementById('gameCanvas'))
    curve.tick()
}