
function render() {


    var fov = 250;

    var SC_W = 600;
    var SC_H = 300;
    var RS = 100;
    var PLAYWIDTH = SC_W / RS;
    var PLAYHEIGHT = 50;
    var HALF_WIDTH = SC_W / 2;
    var HALF_HEIGHT = SC_H / 2;

    var screenLeft = 0.0;
    var screenTop = -10.0;
    var screenFront = 0.0;


    function convert3Dto2D(x3d, y3d, z3d) {

        var scale = fov / (fov + z3d);
        var x2d = ((x3d - HALF_WIDTH) * scale) + HALF_WIDTH;
        var y2d = ((y3d - HALF_HEIGHT) * scale) + HALF_HEIGHT - (z3d * 0.01);
        // just using a 2 dimensional array as a 2D point - not sure if that's the best way to do it! 
        return [x2d, y2d];
    }

    function noise(x, y) {
        return (Math.sin(y * 0.2) + Math.sin((x + (y * 0.6)) * 0.2)) * 4;
    }

    var canvas = document.getElementById('gameCanvas');
    var c = canvas.getContext('2d');


    function drawLand() {
        c.fillStyle = 'rgb(0,0,0)';
        c.fillRect(0, 0, SC_W, SC_H);
        screenFront += 1;
        screenLeft += 1;


        c.lineWidth = 0.5;

        var slicecount = SC_W / RS;
        var leftshift = (screenLeft % 1) * RS;
        var frontshift = (screenFront % 1) * RS;

        var p2d = [0, 0];

        for (var slicez = 100; slicez >= 10; slicez--) {
            c.beginPath();

            // rudimentary frustum culling
            var edgewidth = slicez * 1.22;

            var zpos = (slicez * RS) - frontshift;
            var slicevisible = false;

            // this bit of code makes the colour fade out towards the distance.
            if (Math.abs(zpos) < 100) linecol = 0xff;
            else if (zpos > 7000) {
                // should give number from 1 - 2000;  
                linecol = (((10000 - zpos) / 3000) * 0xff);

            }
            else {
                linecol = 0xff;
            }

            c.strokeStyle = "rgb(0," + linecol + ",0)";

            // make sure we only moveTo the first point. 

            var firstpoint = true;

            for (var slicex = -edgewidth; slicex <= slicecount + edgewidth; slicex++) {
                var h = (noise(slicex + screenLeft, screenFront + slicez));
                var xpos = (slicex * RS) - leftshift;
                var ypos = (h - screenTop) * RS;

                p2d = convert3Dto2D(xpos, ypos, zpos);
                if (p2d[1] > SC_H) p2d[1] = SC_H;
                else if (p2d[1] < 0) p2d[1] = 0;
                else slicevisible = true;

                if (firstpoint) {
                    c.moveTo(p2d[0], p2d[1]);
                    firstpoint = false;
                }
                else {
                    c.lineTo(p2d[0], p2d[1]);
                }

            }

            if (slicevisible) c.stroke();
        }

    }

    var loop = setInterval(function () { drawLand(); }, 50);
}

window.addEventListener('load',()=>{
    render()
})