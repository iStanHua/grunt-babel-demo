; (function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
        typeof define === 'function' && define.amd ? define(factory) :
            (global.loading = factory());
}(this, function () {
    var tickId = null

    function start(selector, src, color) {

        var waveWidth = 500,
            offset = 0,
            waveHeight = 8,
            waveCount = 5,
            startX = -100,
            startY = 204,
            progress = 0,
            progressStep = 1,
            d2 = waveWidth / waveCount,
            d = d2 / 2,
            hd = d / 2;
        var c = document.querySelector(selector);
        var ctx = c.getContext("2d");
        var img = new Image();

        function tick() {
            offset -= 5;
            progress += progressStep;
            if (progress > 220 || progress < 0) progressStep *= -1;
            if (-1 * offset === d2) offset = 0;
            ctx.clearRect(0, 0, c.width, c.height);
            ctx.beginPath();
            var offsetY = startY - progress;
            ctx.moveTo(startX - offset, offsetY);
            for (var i = 0; i < waveCount; i++) {
                var dx = i * d2;
                var offsetX = dx + startX - offset;
                ctx.quadraticCurveTo(offsetX + hd, offsetY + waveHeight, offsetX + d, offsetY);
                ctx.quadraticCurveTo(offsetX + hd + d, offsetY - waveHeight, offsetX + d2, offsetY);
            }


            ctx.lineTo(startX + waveWidth, 300);
            ctx.lineTo(startX, 300);

            ctx.fill();
            //画布上已有的内容只会在它和新图形重叠的地方保留。新图形绘制于内容之后。
            ctx.globalCompositeOperation = "destination-atop";
            ctx.drawImage(img, 0, -1)
            tickId = requestAnimationFrame(tick);
        }

        img.onload = function () {
            c.width = img.width
            c.height = img.height
            ctx.fillStyle = color;
            tick();
        };

        img.src = src

    }

    function stop() {
        cancelAnimationFrame(tickId)
    }

    return {
        start: start,
        stop: stop
    }
}));

class Loading {
    constructor(canvas, src, color) {
        this.ctx = canvas.getContext('2d')
        this.width = canvas.width
        this.height = canvas.height
        this.src = src
        this.color = color
        this.tickId = null
    }
    tick() {
        let waveWidth = 500,
            offset = 0,
            waveHeight = 8,
            waveCount = 5,
            startX = -100,
            startY = 204,
            progress = 0,
            progressStep = 1,
            d2 = waveWidth / waveCount,
            d = d2 / 2,
            hd = d / 2
        offset -= 5
        console.log(offset)
        progress += progressStep
        if (progress > 220 || progress < 0) progressStep *= -1
        if (-1 * offset === d2) offset = 0
        this.ctx.clearRect(0, 0, this.width, this.height)
        this.ctx.beginPath()
        let offsetY = startY - progress
        this.ctx.moveTo(startX - offset, offsetY)
        for (let i = 0; i < waveCount; i++) {
            let dx = i * d2
            let offsetX = dx + startX - offset
            this.ctx.quadraticCurveTo(offsetX + hd, offsetY + waveHeight, offsetX + d, offsetY)
            this.ctx.quadraticCurveTo(offsetX + hd + d, offsetY - waveHeight, offsetX + d2, offsetY)
        }


        this.ctx.lineTo(startX + waveWidth, 300)
        this.ctx.lineTo(startX, 300)

        this.ctx.fill()


    }
    start() {
        this.tick()
        if (this.src) {
            let img = new Image()
            // 画布上已有的内容只会在它和新图形重叠的地方保留。新图形绘制于内容之后。
            this.ctx.globalCompositeOperation = 'destination-atop'
            this.ctx.drawImage(img, 0, -1)
            this.tickId = window.requestAnimationFrame(this.tick.bind(this))
            img.onload = () => {
                this.width = img.width
                this.height = img.height
                this.ctx.fillStyle = this.color
            }

            img.src = this.src
        }

    }
    stop() {
        cancelAnimationFrame(this.tickId)
    }
}


window.addEventListener('load', () => {
    loading.start('#gameCanvas', '../images/qq.png', '#59a6e9')
})