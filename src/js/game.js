window.requestAnimationFrame = window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function (callback) {
        window.setTimeout(callback, 1000 / 60)
    }

window.cancelAnimationFrame = window.cancelAnimationFrame ||
    window.mozCancelAnimationFrame ||
    function (timer) {
        clearTimeout(timer)
    }

class Loader {
    constructor() {
        this.images = {}
    }
    loadImage(key, src) {
        let img = new Image()
        let p = new Promise((resolve, reject) => {
            img.onload = () => {
                this.images[key] = img
                resolve(img)
            }
            img.onerror = () => {
                reject('Could not load image：' + src)
            }
        })
        img.src = src
        return p
    }

    getImage(key) {
        return (key in this.images) ? this.images[key] : null
    }
}
class Keyboard {
    constructor() {
        this.LEFT = 37
        this.RIGHT = 39
        this.UP = 38
        this.DOWN = 40
        this._keys = {}
    }
    listenForEvents(keys) {
        window.addEventListener('keydown', this._onKeyDown.bind(this))
        window.addEventListener('keyup', this._onKeyUp.bind(this))
        keys.forEach((key)=>{
            this._keys[key] = false
        })
    }
    _onKeyDown(event) {
        let keyCode = event.keyCode
        if (keyCode in this._keys) {
            event.preventDefault()
            this._keys[keyCode] = true
        }
    }
    _onKeyUp(event) {
        let keyCode = event.keyCode
        if (keyCode in this._keys) {
            event.preventDefault()
            this._keys[keyCode] = false
        }
    }
    isDown(keyCode) {
        if (!keyCode in this._keys)
            throw new Error('Keycode ' + keyCode + ' is not being listened to')
        return this._keys[keyCode]
    }
}

class Game extends Loader {
    constructor(canvas) {
        super()
        this.canvas = canvas
        this.ctx = canvas.getContext('2d')
        // 前一帧时间
        this._previousElapsed = 0

        this.keyboard = new Keyboard()
    }
    init() {

    }
    tick(elapsed) {
        window.requestAnimationFrame(this.tick.bind(this))
        // 清除前一帧
        this.ctx.clearRect(0, 0, 512, 512)
        // 以秒为单位计算增量时间 - 也是上限
        let delta = (elapsed - this._previousElapsed) / 1000.00
        delta = Math.min(delta, 0.25)  // 最大250 ms的增量
        this._previousElapsed = elapsed

        this.update(delta)
        this.render()
    }
    render() {

    }
    update(delta) {

    }
    start() {
        let p = this.load()
        Promise.all(p).then(loaded => {
            this.init()
            window.requestAnimationFrame(this.tick.bind(this))
        })
    }
    load() {

    }
}