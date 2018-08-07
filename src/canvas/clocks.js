class Clocks {
    constructor(canvas) {
        this.ctx = canvas.getContext('2d')
    }
    init() {
        this.draw()
        setInterval(() => {
            this.draw()
        }, 1000)
    }
    draw() {
        //清除画布
        this.ctx.clearRect(0, 0, 500, 500);
        //背景
        this.ctx.fillStyle = "#ffed00";
        this.ctx.fillRect(0, 0, 500, 500);
        //表盘
        this.ctx.strokeStyle = "#000"
        this.ctx.lineWidth = 5;
        this.ctx.beginPath();
        this.ctx.arc(250, 250, 200, 0, 360, false);
        this.ctx.stroke();
        this.ctx.closePath();
        //分针刻度
        this.ctx.save();
        this.ctx.translate(250, 250);
        for (var i = 0; i < 60; i++) {
            this.ctx.rotate(Math.PI / 30)
            this.ctx.beginPath();
            this.ctx.moveTo(0, -180);
            this.ctx.lineTo(0, -190);
            this.ctx.stroke();
            this.ctx.closePath();
        }
        this.ctx.restore();
        //获取时间
        var now = new Date();
        var hour = now.getHours();
        var min = now.getMinutes();
        var sec = now.getSeconds();
        hour = hour + min / 60;
        min = min + sec / 60;
        //时针刻度
        this.ctx.save();
        this.ctx.translate(250, 250);
        for (var i = 0; i < 60; i++) {
            this.ctx.rotate(Math.PI / 6)
            this.ctx.beginPath();
            this.ctx.moveTo(0, -170);
            this.ctx.lineTo(0, -190);
            this.ctx.stroke();
            this.ctx.closePath();
        }
        this.ctx.restore();
        //时针
        this.ctx.save();
        this.ctx.beginPath();
        this.ctx.translate(250, 250);
        this.ctx.rotate(Math.PI / 6 * hour);
        this.ctx.moveTo(0, 10);
        this.ctx.lineWidth = 7;
        this.ctx.lineTo(0, -140);
        this.ctx.stroke();
        this.ctx.closePath();
        this.ctx.restore();
        //分针
        this.ctx.save();
        this.ctx.beginPath();
        this.ctx.translate(250, 250);
        this.ctx.rotate(Math.PI / 30 * min);
        this.ctx.moveTo(0, 15);
        this.ctx.lineWidth = 5;
        this.ctx.lineTo(0, -160);
        this.ctx.stroke();
        this.ctx.closePath();
        this.ctx.restore();
        //秒针
        this.ctx.save();
        this.ctx.translate(250, 250);
        this.ctx.rotate(Math.PI / 30 * sec);
        this.ctx.beginPath();
        this.ctx.strokeStyle = "red";
        this.ctx.lineWidth = 3;
        this.ctx.moveTo(0, 20);
        this.ctx.lineTo(0, -185);
        this.ctx.stroke();
        this.ctx.closePath();
        this.ctx.beginPath();
        this.ctx.strokeStyle = "red";
        this.ctx.fillStyle = "#FFFFFF";
        this.ctx.lineWidth = 5;
        this.ctx.arc(0, 0, 3, 0, 2 * Math.PI);
        this.ctx.stroke();
        this.ctx.fill();
        this.ctx.closePath();
        this.ctx.beginPath();
        this.ctx.strokeStyle = "red";
        this.ctx.fillStyle = "#FFFFFF";
        this.ctx.lineWidth = 5;
        this.ctx.arc(0, -160, 3, 0, 2 * Math.PI);
        this.ctx.stroke();
        this.ctx.fill();
        this.ctx.closePath();
        this.ctx.restore();
    }
}

window.onload = () => {
    let clock = new Clocks(document.getElementById('gameCanvas'))
    clock.init()
}