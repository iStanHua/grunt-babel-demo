class Animation {
    constructor(canvas) {
        this.ctx = canvas.getContext('2d')
        this.width = canvas.width
        this.height = canvas.height
        this.paused = true
        this.instance = [
            {
                x: 150,
                y: 250,
                lastX: 150,
                lastY: 250,
                velorityX: -3.2,
                velorityY: 3.5,
                radius: 50,
                innerColor: 'rgba(255,100,0,1)',
                middleColor: 'rgba(255,100,100,0.7)',
                outerColor: 'rgba(255,255,255,0.5)',
                strokeStyle: 'green'
            },
            {
                x: 150,
                y: 75,
                lastX: 150,
                lastY: 75,
                velorityX: 1.2,
                velorityY: 1.5,
                radius: 25,
                innerColor: 'rgba(255,0,0,1)',
                middleColor: 'rgba(255,0,255,0.7)',
                outerColor: 'rgba(255,255,0,0.5)',
                strokeStyle: 'orange'
            }
        ]
        this.lastTime = 0
        this.lastFpsUpdateTime = 0
        this.lastFpsUpdate = 0
    }

    update() {
        let disc = null
        for (let i = 0; i < this.instance.length; i++) {
            disc = this.instance[i]
            if (disc.x + disc.velorityX + disc.radius > this.width ||
                disc.x + disc.velorityX - disc.radius < 0)
                disc.velorityX = -disc.velorityX
            if (disc.y + disc.velorityY + disc.radius > this.height ||
                disc.y + disc.velorityY - disc.radius < 0)
                disc.velorityY = -disc.velorityY
            disc.x += disc.velorityX
            disc.y += disc.velorityY
        }
    }

    render() {
        let disc = null
        for (let i = 0; i < this.instance.length; i++) {
            disc = this.instance[i]
            let gradient = this.ctx.createRadialGradient(disc.x, disc.y, 0, disc.x, disc.y, disc.radius)
            gradient.addColorStop(.3, disc.innerColor)
            gradient.addColorStop(.5, disc.middleColor)
            gradient.addColorStop(1, disc.outerColor)
            this.ctx.beginPath()
            this.ctx.fillStyle = gradient;
            this.ctx.strokeStyle = disc.strokeStyle
            this.ctx.arc(disc.x, disc.y, disc.radius, 0, Math.PI * 2)
            this.ctx.fill()
            this.ctx.stroke()
            this.ctx.restore()
        }
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

    _calculateFPS() {
        let now = (+new Date)
        let fps = 1000 / (now - this.lastTime)
        this.lastTime = now
        return fps
    }

    tick(elapsed) {
        if (!elapsed) {
            elapsed = (+new Date)
        }
        if (!this.paused) {
            let fps = 0
            this.ctx.clearRect(0, 0, this.width, this.height)
            this.update()
            this.render()
            let now = (+new Date)
            fps = this._calculateFPS()
            if (now - this.lastFpsUpdateTime > 1000) {
                this.lastFpsUpdateTime = now
                this.lastFpsUpdate = fps
            }
            this.ctx.fillStyle = '#2d8cf0'
            this.ctx.font = '.48rem Helvetica';
            this.ctx.textAlign = 'center'
            this.ctx.fillText(this.lastFpsUpdate.toFixed(2) + ' FPS', this.width / 2, 60)
            window.requestAnimationFrame(this.tick.bind(this))
        }
    }
    setPaused() {
        this.paused = true
    }
    setPlay() {
        this.paused = false
        this.timer = window.requestAnimationFrame(this.tick.bind(this))
    }
}

window.onload = () => {
    let animation = new Animation(document.getElementById('gameCanvas'))
    let J_btn = document.getElementById('J_btn')
    let paused = true
    J_btn.addEventListener('click', () => {
        paused = !paused
        if (paused) {
            animation.setPaused()
            J_btn.innerText = '启动'
        }
        else {
            animation.setPlay()
            J_btn.innerText = '暂停'
        }
    })
}