/**
 * SiriWave
 * @param {Object} options
 * @param {Object} options.canvas     canvas
 * @param {Number} options.ratio      比率
 * @param {Number} options.width      宽度
 * @param {Number} options.height     高度
 * @param {Float} options.amplitude   振幅
 * @param {Float} options.speed       速度
 * @param {Float} options.frequency   频率
 * @param {String} options.color      颜色
 * @param {Boolean} options.autostart 自动启动
 */
class SiriWave {
    constructor(options = {}) {
        this.canvas = options.canvas
        this.ratio = options.ratio || window.devicePixelRadio || 1
        this.amplitude = options.amplitude || 1
        this.speed = options.speed || 0.2
        this.frequency = options.frequency || 6
        this.color = this._hex2rgb((options.color || '#fff'))

        this.phase = 0
        this.run = false
        this._GATF_cache = {}

        this.ctx = this.canvas.getContext('2d')

        this.width = this.canvas.width
        this.width_2 = this.width / 2
        this.width_4 = this.width / 4

        this.height = this.ratio * this.canvas.height
        this.height_2 = this.height / 2
        this.maxHeight = this.height_2 - 4

        if (options.autostart) {
            this.start()
        }
    }

    _hex2rgb(hex) {
        var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i
        hex = hex.replace(shorthandRegex, function (m, r, g, b) { return r + r + g + g + b + b })
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
        return result ?
            parseInt(result[1], 16).toString() + ',' + parseInt(result[2], 16).toString() + ',' + parseInt(result[3], 16).toString() :
            null
    }

    _globAttFunc(x) {
        if (this._GATF_cache[x] == null) {
            this._GATF_cache[x] = Math.pow(4 / (4 + Math.pow(x, 4)), 2)
        }
        return this._GATF_cache[x]
    }

    _xpos(i) {
        return this.width_2 + i * this.width_4
    }

    _ypos(i, attenuation, flag) {
        let att = (this.maxHeight * this.amplitude) / attenuation
        let x = 1
        if (flag) {
            this.frequency = 6
            x = Math.sin(7 * i - this.phase * 0.8)
        }
        return this.height_2 + this._globAttFunc(i) * att * Math.sin(this.frequency * i - this.phase) + x

    }

    _drawLine(attenuation, color, width, flag) {
        this.ctx.moveTo(0, 0)
        this.ctx.beginPath()
        this.ctx.strokeStyle = color
        this.ctx.lineWidth = width || 1

        var i = -2
        while ((i += 0.01) <= 2) {
            this.ctx.lineTo(this._xpos(i), this._ypos(i, attenuation, flag))
        }

        this.ctx.stroke()
    }

    _clear() {
        this.ctx.globalCompositeOperation = 'destination-out'
        this.ctx.fillRect(0, 0, this.width, this.height)
        this.ctx.globalCompositeOperation = 'source-over'
    }

    _draw() {
        if (!this.run) return

        this.phase = (this.phase + Math.PI * this.speed) % (2 * Math.PI)

        this._clear()
        this._drawLine(-2, 'rgba(' + this.color + ',0.2)')
        this._drawLine(-4, 'rgba(' + this.color + ',0.2)')
        this._drawLine(2, 'rgba(' + this.color + ',0.3)', 1, true)
        this._drawLine(2, 'rgba(' + this.color + ',0.6)')
        this._drawLine(1, 'rgba(' + this.color + ',1)', 1.5)

        requestAnimationFrame(this._draw.bind(this))
    }

    start() {
        this.phase = 0
        this.run = true
        this._draw()
    }

    stop() {
        this.phase = 0
        this.run = false
    }

    setSpeed(v) {
        this.speed = v
    }

    setAmplitude(v) {
        this.amplitude = Math.max(Math.min(v, 1), 0)
    }
}

window.onload = () => {
    var siriWave = new SiriWave({
        canvas: document.getElementById('gameCanvas'),
        ratio: 1,
        speed: 0.006,
        amplitude: 0.6,
        color: '#2d8cf0',
        autostart: true
    })
}