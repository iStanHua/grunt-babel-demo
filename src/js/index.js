class Clock {
    constructor(ctx) {
        this.ctx = ctx
        this.width = ctx.canvas.width
        this.height = ctx.canvas.height
        this.radius = this.width / 2
        this.rem = this.width / 500
    }

    drawBackground() {
        this.ctx.save()
        this.ctx.translate(this.radius, this.radius)
        this.ctx.beginPath()
        this.ctx.lineWidth = 15 * this.rem
        this.ctx.arc(0, 0, this.radius - this.ctx.lineWidth / 2, 0, 2 * Math.PI, false)
        this.ctx.stroke()

        var hourNum = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2]
        this.ctx.font = 36 * this.rem + 'px Arial'
        this.ctx.textAlign = 'center'
        this.ctx.textBaseline = 'middle'
        for (var i = 0; i < 12; i++) {
            var rad = 2 * Math.PI / 12 * i; //对一个不同值的弧度
            var x = Math.cos(rad) * (this.radius - 55 * this.rem)
            var y = Math.sin(rad) * (this.radius - 55 * this.rem)
            this.ctx.fillText(hourNum[i], x, y)
        }

        for (var i = 0; i < 60; i++) {
            var rad = 2 * Math.PI / 60 * i
            var x = Math.cos(rad) * (this.radius - 30 * this.rem)
            var y = Math.sin(rad) * (this.radius - 30 * this.rem)
            this.ctx.beginPath()
            this.ctx.textAlign = 'center'
            this.ctx.textBaseline = 'middle'
            if (i % 5 === 0) {
                this.ctx.fillStyle = '#000'
                this.ctx.arc(x, y, 4 * this.rem, 0, 360, false)
            } else {
                this.ctx.fillStyle = '#ccc'
                this.ctx.arc(x, y, 3 * this.rem, 0, 360, false)
            }
            this.ctx.fill()
        }
    }

    drawHour(hour, minute) {
        this.ctx.save()
        this.ctx.beginPath()
        var rad = 2 * Math.PI / 12 * hour
        var mRad = 2 * Math.PI / 12 / 60 * minute
        this.ctx.rotate(rad + mRad)
        this.ctx.lineWidth = 10 * this.rem
        this.ctx.lineCap = 'round'
        this.ctx.moveTo(0, 10 * this.rem)
        this.ctx.lineTo(0, - this.radius / 2)
        this.ctx.stroke()
        this.ctx.restore()
    }


    drawMinute(minute) {
        this.ctx.save()
        this.ctx.beginPath()
        var rad = 2 * Math.PI / 60 * minute
        this.ctx.rotate(rad)
        this.ctx.lineWidth = 6 * this.rem
        this.ctx.lineCap = 'round'
        this.ctx.moveTo(0, 10 * this.rem)
        this.ctx.lineTo(0, -(this.radius - 80 * this.rem))
        this.ctx.stroke()
        this.ctx.restore()
    }

    drawSecond(second) {
        this.ctx.save()
        this.ctx.fillStyle = 'red'
        this.ctx.beginPath()
        var rad = 2 * Math.PI / 60 * second
        this.ctx.rotate(rad)
        this.ctx.moveTo(-4 * this.rem, 30 * this.rem)
        this.ctx.lineTo(4 * this.rem, 30 * this.rem)
        this.ctx.lineTo(1, -(this.radius - 40 * this.rem))
        this.ctx.lineTo(-1, -(this.radius - 40 * this.rem))
        this.ctx.fill()
        this.ctx.restore()
    }

    drawDot() {
        this.ctx.beginPath()
        this.ctx.fillStyle = '#fff'
        this.ctx.arc(0, 0, 5 * this.rem, 0, 360, false)
        this.ctx.fill()
    }

    draw() {
        this.ctx.clearRect(0, 0, this.width, this.height)
        var now = new Date()
        var hour = now.getHours()
        var minute = now.getMinutes()
        var second = now.getSeconds()
        this.drawBackground()
        this.drawHour(hour, minute)
        this.drawMinute(minute)
        this.drawSecond(second)
        this.drawDot()
        this.ctx.restore()
    }
}


let ctx = document.getElementById('clock').getContext('2d')
const clock = new Clock(ctx)
clock.draw()

setInterval(() => {
    clock.draw()
}, 1000)

var requestAnimationFrame = (function () {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function (callback) {
            window.setTimeout(callback, 1000 / 60)
        }
}())