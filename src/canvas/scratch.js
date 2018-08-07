//canvas对象
var oCanvas = document.getElementById("gameCanvas");
var context = oCanvas.getContext("2d");

context.fillStyle = "#FAEBD7"; //覆盖层颜色
context.fillRect(0, 0, 300, 150); //覆盖区域

oCanvas.onmousemove = function () {
	//鼠标移动的时侯刮的过程动画
	var x = event.clientX - this.offsetLeft - 8;
	var y = event.clientY - this.offsetTop - 8;
	console.log(x, y)
	// context.fillStyle = "#1122FF";
	context.fillStyle = "transparent";
	context.fillRect(x, y, 20, 20);
	context.clearRect(x, y, 20, 20)
}