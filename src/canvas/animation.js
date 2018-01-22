class Animation extends Game {
    constructor() {
        super(document.getElementById('gameCanvas'))
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
    }
    render() {
        this.drawOuterCircle()
        this.drawText()
        this.tick()
    }

    update(delta) {
        let disc = null
        for (var i = 0; i < this.instance.length; i++) {
            disc = discs[i]
            if (disc.x + disc.velorityX + disc.radius > canvas.width ||
                disc.x + disc.velorityX - disc.radius < 0)
                disc.velorityX = -disc.velorityX
            if (disc.y + disc.velorityY + disc.radius > canvas.height ||
                disc.y + disc.velorityY - disc.radius < 0)
                disc.velorityY = -disc.velorityY
            disc.x += disc.velorityX
            disc.y += disc.velorityY
        }
    }

    drawOuterCircle() {
        this.ctx.save()
        this.ctx.beginPath()
        this.ctx.lineWidth = 20
        this.ctx.strokeStyle = '#fff'
        this.ctx.shadowBlur = 10
        this.ctx.shadowColor = 'rgba(0,0,0,.18)'
        this.ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI)
        this.ctx.stroke()
        this.ctx.restore()
    }

    drawInnerCircle(value) {
        this.ctx.beginPath()
        this.ctx.lineCap = 'round'
        this.ctx.lineWidth = 20
        this.ctx.strokeStyle = '#2d8cf0'
        this.ctx.arc(this.x, this.y, this.radius, -Math.PI / 2, -Math.PI / 2 + value / this.max * Math.PI * 2)
        this.ctx.stroke()
        this.drawValue()
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

    drawValue() {
        this.ctx.save()
        this.ctx.beginPath()
        this.ctx.fillStyle = '#2d8cf0'
        this.ctx.font = '.3rem Arial'
        this.ctx.textAlign = 'center'
        this.ctx.clearRect(this.x - this.radius / 2, this.y - this.radius / 2, this.radius, 68)
        this.ctx.fillText(this.speed, this.x, this.y - 30)
        this.ctx.stroke()
        this.ctx.restore()
    }

    tick() {
        this.timer = window.requestAnimationFrame(this.tick.bind(this))
        this.drawInnerCircle(this.speed)
        if (this.speed < this.value) {
            this.speed++
        }
        else {
            this.speed = this.value
            window.cancelAnimationFrame(this.timer)
        }
    }
}

var canvas = document.getElementById('gameCanvas'),
    ctx = canvas.getContext('2d'),
    paused = true,
    discs = [
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
        },
    ],
    numDiscs = discs.length,
    animationButton = document.getElementById('J_btn');

function drawBackground() {

}
function update() {
    var disc = null;

    for (var i = 0; i < numDiscs; i++) {
        disc = discs[i];
        if (disc.x + disc.velorityX + disc.radius >
            canvas.width ||
            disc.x + disc.velorityX - disc.radius < 0)
            disc.velorityX = -disc.velorityX;
        if (disc.y + disc.velorityY + disc.radius >
            canvas.height ||
            disc.y + disc.velorityY - disc.radius < 0)
            disc.velorityY = -disc.velorityY;
        disc.x += disc.velorityX;
        disc.y += disc.velorityY;
    }
}

function draw() {
    var disc = discs[i];
    for (var i = 0; i < numDiscs; i++) {
        disc = discs[i];
        gradient = ctx.createRadialGradient(disc.x, disc.y, 0,
            disc.x, disc.y, disc.radius);//放射渐变
        gradient.addColorStop(0.3, disc.innerColor);
        gradient.addColorStop(0.5, disc.middleColor);
        gradient.addColorStop(1.0, disc.outerColor);

        ctx.save();
        ctx.beginPath();
        ctx.arc(disc.x, disc.y, disc.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = gradient;
        ctx.strokeStyle = disc.strokeStyle;
        ctx.fill();
        ctx.stroke();
        ctx.restore();
    }
}

//calculate frame rate
var lastTime = 0;
function calculateFps() {
    var now = (+new Date),
        fps = 1000 / (now - lastTime);
    lastTime = now;
    return fps;
}

//以不同的帧速率来执行不同的任务
var lastFpsUpdateTime = 0,
    lastFpsUpdate = 0;

//Animation
function animate(time) {
    var fps = 0;
    if (time == undefined) {
        time = +new Date;//+new Date()是一个东西;  +相当于.valueOf();
    };
    if (!paused) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        //drawBackground();
        update();
        draw();
        var now = + new Date();
        //console.log(now);
        fps = calculateFps();
        if (now - lastFpsUpdateTime > 1000) {
            lastFpsUpdateTime = now;
            lastFpsUpdate = fps;
        };
        ctx.fillStyle = 'cornflowerblue';
        ctx.fillText(lastFpsUpdate.toFixed(2) + ' fps', 20, 60);
        window.requestAnimationFrame(animate);
    }
}

// //event handlers
animationButton.onclick = function (e) {
    paused = paused ? false : true;
    if (paused) {
        animationButton.value = 'Animate';
    } else {
        window.requestAnimationFrame(animate);
        animationButton.value = 'Pause';
    }
}

//Initialization
ctx.font = '48px Helvetica';

window.onload = () => {
    var animation = new Animation(document.getElementById('gameCanvas'))
    animation.init()
}