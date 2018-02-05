class Pixel {
    constructor(canvas) {
        this.canvas = canvas
        this.ctx = canvas.getContext('2d')
        this.src = '../images/bg.jpg'
    }
    /**
     * draw
     * @param {Number} type 
     * @param {Number} delta 
     */
    draw(type, delta) {
        this._drawImage(() => {
            let imgData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height)
            console.log(imgData.data.length)
            switch (type) {
                case 1: // 灰度效果
                    this._grayscale(imgData)
                    break
                case 2: // 复古效果
                    this._sepia(imgData)
                    break
                case 3: // 红色蒙版效果
                    this._redmask(imgData)
                    break
                case 4: // 亮度效果
                    this._brightness(imgData, delta)
                    break
                case 4: // 反转效果
                    this._invert(imgData)
                    break
                default:
                    break
            }
            this.ctx.putImageData(imgData, 0, 0)
        })
    }
    /**
     * 图像转canvas
     * @param {Function} callback
     */
    _drawImage(callback) {
        let img = new Image()
        img.onload = () => {
            this.canvas.width = img.width
            this.canvas.height = img.height
            this.ctx.clearRect(0, 0, img.width, img.height)
            this.ctx.drawImage(img, 0, 0)

            if (typeof callback === 'function') {
                callback()
            }
        }
        img.src = this.src
    }
    /**
     * 灰度效果
     * @param {Object} pixels 像素数据
     */
    _grayscale(pixels) {
        let p = pixels.data
        for (let i = 0; i < p.length; i += 4) {
            let r = p[i]
            let g = p[i + 1]
            let b = p[i + 2]
            p[i] = p[i + 1] = p[i + 2] = (r + g + b) / 3
        }
        return pixels
    }
    /**
     * 复古效果
     * @param {Object} pixels 像素数据
     */
    _sepia(pixels) {
        let p = pixels.data
        for (let i = 0; i < p.length; i += 4) {
            let r = p[i]
            let g = p[i + 1]
            let b = p[i + 2]
            p[i] = r * 0.393 + g * 0.769 + b * 0.189
            p[i + 1] = r * 0.349 + g * 0.686 + b * 0.168
            p[i + 2] = r * 0.272 + g * 0.534 + b * 0.131
        }
        return pixels
    }
    /**
     * 红色蒙版效果
     * @param {Object} pixels 像素数据
     */
    _redmask(pixels) {
        let p = pixels.data
        for (let i = 0; i < p.length; i += 4) {
            let r = p[i]
            let g = p[i + 1]
            let b = p[i + 2]
            p[i] = (r + g + b) / 3
            p[i + 1] = p[i + 2] = 0
        }
        return pixels
    }
    /**
     * 亮度效果
     * @param {Object} pixels 像素数据
     * @param {Number} delta 
     */
    _brightness(pixels, delta) {
        let p = pixels.data
        for (let i = 0; i < p.length; i += 4) {
            p[i] += delta
            p[i + 1] += delta
            p[i + 2] += delta
        }
        return pixels
    }
    /**
     * 反转效果
     * @param {Object} pixels 像素数据
     */
    _invert(pixels, delta) {
        let p = pixels.data
        for (let i = 0; i < p.length; i += 4) {
            p[i] = 255 - p[i]
            p[i + 1] = 255 - p[i + 1]
            p[i + 2] = 255 - p[i + 1]
        }
        return pixels
    }
}

window.onload = () => {
    let pixel = new Pixel(document.getElementById('gameCanvas'))
    pixel.draw()

    document.getElementById('J_grayscale').addEventListener('click', () => {
        pixel.draw(1)
    })
    document.getElementById('J_sepia').addEventListener('click', () => {
        pixel.draw(2)
    })
    document.getElementById('J_redmask').addEventListener('click', () => {
        pixel.draw(3)
    })
    document.getElementById('J_brightness').addEventListener('click', () => {
        pixel.draw(4, .8)
    })
    document.getElementById('J_invert').addEventListener('click', () => {
        pixel.draw(5)
    })
}