var oCanvas = document.getElementById('gameCanvas');
var context = oCanvas.getContext("2d");
var ang = 0.5;
var ong = 1;
var ung = 0.1;
var sng = 0.8;
var m = 0;


function zhuan() {
    m++;
    context.clearRect(0, 0, 540, 540);
    //画布
    context.fillStyle = "#96b8f5";
    context.fillRect(0, 0, 540, 540);
    //云一
    context.beginPath();
    context.arc(10 + m, 370, 50, 0, 360)
    context.closePath();
    context.fillStyle = "#afcaf5";
    context.fill();
    //云二
    context.beginPath();
    context.arc(70 + m, 370, 50, 0, 360)
    context.closePath();
    context.fillStyle = "#afcaf5";
    context.fill();
    //云三
    context.beginPath();
    context.arc(190 + m, 350, 100, 0, 360)
    context.closePath();
    context.fillStyle = "#afcaf5";
    context.fill();
    //云四
    context.beginPath();
    context.arc(300 + m, 350, 50, 0, 360)
    context.closePath();
    context.fillStyle = "#afcaf5";
    context.fill();
    //山丘二
    context.beginPath();
    context.moveTo(0, 350);
    context.quadraticCurveTo(100, 350, 220, 390); //二次
    context.lineTo(220, 540);
    context.lineTo(0, 540);
    context.lineTo(0, 350);
    context.fillStyle = "#95b6eb";
    context.fill();
    context.closePath();
    //山丘一
    context.beginPath();
    context.moveTo(0, 430);
    context.bezierCurveTo(250, 450, 400, 230, 540, 340); //三次
    context.lineTo(540, 540);
    context.lineTo(0, 540);
    context.lineTo(0, 430);
    context.fillStyle = "#84a8e6";
    context.fill();
    context.closePath();
    //大风车一
    context.save();
    context.translate(350, 220);
    context.beginPath();
    context.moveTo(-3, -3);
    context.lineTo(3, -3);
    context.lineTo(6, 130);
    context.lineTo(-6, 130);
    context.lineTo(-3, -3);
    context.fillStyle = "#7090cd";
    context.fill();
    context.closePath();
    context.restore();
    //风扇叶
    context.save();
    context.translate(350, 220);
    context.rotate(Math.PI / 10 * ang);
    for (var i = 0; i < 3; i++) {
        context.rotate(2 * Math.PI / 3);
        context.beginPath();
        context.moveTo(0, -3);
        context.lineTo(50, -2);
        context.lineTo(50, 2);
        context.lineTo(0, 3);
        context.lineTo(0, -3);
        context.fillStyle = "#83a5ec";
        context.fill();
        context.closePath();
    }
    context.restore();
    ang++;

    //大风车二
    context.save();
    context.translate(480, 250);
    context.beginPath();
    context.moveTo(-3, -3);
    context.lineTo(3, -3);
    context.lineTo(4, 70);
    context.lineTo(-4, 70);
    context.lineTo(-3, -3);
    context.fillStyle = "#7090cd";
    context.fill();
    context.closePath();
    context.restore();
    //风扇叶
    context.save();
    context.translate(480, 250);
    context.rotate(Math.PI / 10 * ong);
    for (var i = 0; i < 3; i++) {
        context.rotate(2 * Math.PI / 3);
        context.beginPath();
        context.moveTo(0, -2);
        context.lineTo(30, -1);
        context.lineTo(30, -1);
        context.lineTo(0, 2);
        context.lineTo(0, -2);
        context.fillStyle = "#83a5ec";
        context.fill();
        context.closePath();
    }
    context.restore();
    ong++;

    //风车三
    context.save();
    context.translate(50, 300);
    context.beginPath();
    context.moveTo(-2, -2);
    context.lineTo(2, -2);
    context.lineTo(3, 70);
    context.lineTo(-3, 70);
    context.lineTo(-2, -2);
    context.fillStyle = "#7090cd";
    context.fill();
    context.closePath();
    context.restore();
    //风扇叶
    context.save();
    context.translate(50, 300);
    context.rotate(Math.PI / 20 * ung);
    for (var i = 0; i < 3; i++) {
        context.rotate(2 * Math.PI / 3);
        context.beginPath();
        context.moveTo(0, -2);
        context.lineTo(25, -1);
        context.lineTo(25, -1);
        context.lineTo(0, 2);
        context.lineTo(0, -2);
        context.fillStyle = "#83a5ec";
        context.fill();
        context.closePath();
    }
    context.restore();
    ung++;

    //风车四
    context.save();
    context.translate(150, 270);
    context.beginPath();
    context.moveTo(-2, -2);
    context.lineTo(2, -2);
    context.lineTo(3, 110);
    context.lineTo(-3, 110);
    context.lineTo(-2, -2);
    context.fillStyle = "#7090cd";
    context.fill();
    context.closePath();
    context.restore();
    //风扇叶
    context.save();
    context.translate(150, 270);
    context.rotate(Math.PI / 40 * sng);
    for (var i = 0; i < 3; i++) {
        context.rotate(2 * Math.PI / 3);
        context.beginPath();
        context.moveTo(0, -2);
        context.lineTo(25, -1);
        context.lineTo(25, -1);
        context.lineTo(0, 2);
        context.lineTo(0, -2);
        context.fillStyle = "#83a5ec";
        context.fill();
        context.closePath();
    }
    context.restore();
    sng++;
}
zhuan();
setInterval(zhuan, 100)