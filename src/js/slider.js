class Slider {
    constructor(element, value = 0, changeCallback, min = 0, max = 100) {
        this.$el = element
        this.value = value
        this.change = changeCallback
        this.min = min
        this.max = max
        this.color = 'black'
        this.mousePressed = false

        this.createChild()
    }

    createChild() {
        this.$child = document.createElement('div')
        this.$child.style.position = 'absolute'
        this.$child.style.height = this.$el.offsetHeight + 'px'
        this.$el.appendChild(this.$child)
        this.draw()
        this.$el.addEventListener('mousedown', e => {
            this.mousePressed = true
            this._onChange(e)
        })
        this.$el.addEventListener('mouseup', e => {
            this.mousePressed = false
        })
        this.$el.addEventListener('mouseleave', e => {
            this.mousePressed = false
        })
        this.$el.addEventListener('mousemove', e => {
            if (this.mousePressed) {
                this._onChange(e)
            }
        })
    }

    draw() {
        let percent = (this.value - this.min) / (this.max - this.min)
        this.$child.style.backgroundColor = this.color
        this.$child.style.width = percent * this.$el.offsetWidth + 'px'
        this.$child.style.height = this.$el.offsetHeight + 'px'
    }

    setColor(c) {
        this.color = c
    }

    getValue() {
        return this.value
    }

    _clamp(x, min, max) {
        return Math.max(min, Math.min(max, x))
    }

    _getMousePosition(e, element) {
        let boundingRect = element.getBoundingClientRect()
        return {
            x: e.clientX - boundingRect.left,
            y: e.clientY - boundingRect.top
        }
    }

    _onChange(e) {
        let mouseX = this._getMousePosition(e, this.$el).x
        this.value = this._clamp((mouseX / this.$el.offsetWidth) * (this.max - this.min) + this.min, this.min, this.max)
        if (typeof this.change === 'function') {
            this.change(this.value)
        }
        this.draw()
    }
}