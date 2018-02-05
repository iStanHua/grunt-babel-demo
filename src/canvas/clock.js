class Clock {
    constructor(canvas) {
        this.ctx = canvas.getContext('2d')
        this.width = canvas.width
        this.height = canvas.height
        this.x = this.width / 2
        this.y = this.height / 2
        this.radius = 130
        this.hR = 60
        this.hr = 10
        this.mR = 90
        this.mr = 20
        this.sR = 120
        this.sr = 30
    }
    init() {
        this.draw()
        setInterval(() => {
            this.clear()
            this.draw()
        }, 1000)
    }
    clear() {
        this.ctx.clearRect(0, 0, this.width, this.height)
    }
    draw() {
        this.drawDial()
        this.drawPointer()
    }
    drawDial() {
        this.ctx.beginPath()
        this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true)
        this.ctx.lineWidth = 6
        this.ctx.strokeStyle = '#f90'
        this.ctx.stroke()
        let inR = this.radius - 10
        let x0 = 0
        let y0 = 0
        let x1 = 0
        let y1 = 0
        let angle = 1 / 30 * Math.PI
        this.ctx.strokeStyle = 'rgb(132,197,36)'
        this.ctx.lineWidth = 2.0
        for (let i = 0; i < 60; i++) {
            this.ctx.beginPath()
            x0 = this.x + inR * Math.sin(angle * i)
            y0 = this.y - inR * Math.cos(angle * i)
            if (i % 5) {
                x1 = this.x + (inR - 5) * Math.sin(angle * i)
                y1 = this.y - (inR - 5) * Math.cos(angle * i)
            }
            else {
                x1 = this.x + (inR - 15) * Math.sin(angle * i)
                y1 = this.y - (inR - 15) * Math.cos(angle * i)
            }
            this.ctx.moveTo(x0, y0)
            this.ctx.lineTo(x1, y1)
            this.ctx.stroke()
        }
        this.ctx.stroke()

        let numR = this.radius - 45
        let angleNum = 1 / 6 * Math.PI
        let xN = 0
        let yN = 0
        this.ctx.fillStyle = 'orange'
        this.ctx.font = '0.23rem Verdana'
        this.ctx.textAlign = 'center'
        this.ctx.textBaseline = 'middle'
        for (let i = 1; i <= 12; i++) {
            xN = this.x + numR * Math.sin(angleNum * i)
            yN = this.y - numR * Math.cos(angleNum * i)
            this.ctx.fillText(i, xN, yN)
        }
        this.ctx.stroke()
    }
    drawPointer() {
        let d = new Date()
        let h = d.getHours()
        let m = d.getMinutes()
        let s = d.getSeconds()
        let ms = d.getMilliseconds()
        let sAngle = s / 60 * Math.PI * 2
        let mAngle = m / 60 * Math.PI * 2 + sAngle / 60
        let hAngle = (h % 12) / 12 * Math.PI * 2 + mAngle / 12
        let sX0 = this.x - this.sr * Math.sin(sAngle)
        let sY0 = this.y + this.sr * Math.cos(sAngle)
        let sX1 = this.x + this.sR * Math.sin(sAngle)
        let sY1 = this.y - this.sR * Math.cos(sAngle)

        let mX0 = this.x - this.mr * Math.sin(mAngle)
        let mY0 = this.y + this.mr * Math.cos(mAngle)
        let mX1 = this.x + this.mR * Math.sin(mAngle)
        let mY1 = this.y - this.mR * Math.cos(mAngle)

        let hX0 = this.x - this.hr * Math.sin(hAngle)
        let hY0 = this.y + this.hr * Math.cos(hAngle)
        let hX1 = this.x + this.hR * Math.sin(hAngle)
        let hY1 = this.y - this.hR * Math.cos(hAngle)

        this.ctx.beginPath()
        this.ctx.moveTo(sX0, sY0)
        this.ctx.lineTo(sX1, sY1)
        this.ctx.strokeStyle = '#c00'
        this.ctx.lineWidth = 2.0
        this.ctx.stroke()

        this.ctx.beginPath()
        this.ctx.moveTo(mX0, mY0)
        this.ctx.lineTo(mX1, mY1)
        this.ctx.strokeStyle = '#00c'
        this.ctx.lineWidth = 3.0
        this.ctx.stroke()

        this.ctx.beginPath()
        this.ctx.moveTo(hX0, hY0)
        this.ctx.lineTo(hX1, hY1)
        this.ctx.strokeStyle = '#400'
        this.ctx.lineWidth = 4.0
        this.ctx.stroke()
    }
}

window.onload = () => {
    let clock = new Clock(document.getElementById('gameCanvas'))
    clock.init()
}