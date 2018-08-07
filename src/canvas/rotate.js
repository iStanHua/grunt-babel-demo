function load_captcha(divid, url) {

    //detecting the device can handle the touch events
    var detecttouch = 'ontouchstart' in window || !!(navigator.msMaxTouchPoints);

    var canvas = document.getElementById(divid);
    var ctx = canvas.getContext('2d');

    //width and the height of the images
    var w1;
    var h1;


    switch (window.orientation) {
        case -90:
        case 90:
            var y = window.innerHeight || document.body.clientHeight;
            console.log("width: " + y);

            canvas.width = canvas.height = y > 480 ? 480 : y - 30;

            w1 = w2 = h1 = h2 = canvas.height;
            break;
        default:
            var x = window.innerWidth || document.body.clientWidth;
            console.log("width: " + x);

            canvas.width = canvas.height = x > 480 ? 480 : x - 30;
            w1 = w2 = h1 = h2 = canvas.width;
            break;
    }


    var isDown = false;
    var isTuoching = false;

    //half of the width and the height of the canvas
    var cx = canvas.width / 2;
    var cy = canvas.height / 2;

    var current = 0;

    var initial1 = -1;
    var last1 = 2 * Math.PI;
    var result1 = 0;


    //large image
    var img1 = new Image();
    img1.onload = function () {
        draw();
    };
    img1.src = url;

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        drawOuterImage();
    }

    //drowing outer image
    function drawOuterImage() {
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(result1);
        ctx.drawImage(img1, 0, 0, img1.width, img1.height, - w1 / 2, - h1 / 2, w1, h1);
        ctx.restore();
    }

    function getMousePosition(canvas, evt) {
        var rect = canvas.getBoundingClientRect();

        if (detecttouch && isTuoching) {
            var touch = evt.changedTouches[0];

            return {
                x: touch.clientX - rect.left,
                y: touch.clientY - rect.top
            };
        } else {
            return {
                x: evt.clientX - rect.left,
                y: evt.clientY - rect.top
            };
        }
    }

    function handleMouseDown(e) {
        var mousePos = getMousePosition(canvas, e);

        isDown = true;

    }

    function handleMouseUp(e) {
        isDown = false;

        initial1 = -1;
        last1 = result1 + 2 * Math.PI;
    }

    function handleMouseOut(e) {
        isDown = false;
    }

    var clockwise = false;
    var counterClockwise = false;

    function handleMouseMove(e) {
        if (!isDown) { return; }

        var mousePos = getMousePosition(canvas, e);

        var dx = mousePos.x - cx;
        var dy = mousePos.y - cy;

        if ((current > 2 * Math.PI - 0.1) && (Math.atan2(dy, dx) + Math.PI < 0.1))
            clockwise = true;

        if ((current < 0.1) && (Math.atan2(dy, dx) + Math.PI > 2 * Math.PI - 0.1))
            counterClockwise = true;

        current = Math.atan2(dy, dx) + Math.PI;// + initial1;


        if (initial1 === -1)
            initial1 = current;

        if (clockwise) {
            result1 = last1 + current + 2 * Math.PI - initial1;
            clockwise = false;
        } else if (counterClockwise) {
            result1 = last1 - current + 2 * Math.PI + initial1;
            counterClockwise = false;
        } else {
            result1 = last1 + current - initial1;
        }


        result1 = result1 % (2 * Math.PI);

        draw();
    }

    function startTouch(e) {
        isTuoching = true;
        handleMouseDown(e);
    }

    function moveTouch(e) {
        e.preventDefault();

        isTuoching = true;
        handleMouseMove(e);
    }

    function endTouch(e) {
        isTuoching = false;
        handleMouseUp(e);
    }

    function outTouch(e) {
        isTuoching = false;
        handleMouseOut(e);
    }
    /*
	function doOnOrientationChange()
	{
	switch(window.orientation) 
	{  
	  case -90:
	  case 90:
		alert('landscape');
		break; 
	  default:
		alert('portrait');
		break; 
	}
	}
*/
    if (detecttouch) {
        canvas.addEventListener('touchstart', startTouch, false);
        canvas.addEventListener('touchmove', moveTouch, false);
        canvas.addEventListener('touchend', endTouch, false);
        canvas.addEventListener('touchout', outTouch, false);
        canvas.addEventListener('touchstart', refreshCaptcha, false);
    } else {
        canvas.addEventListener('mousedown', handleMouseDown, false);
        canvas.addEventListener('mousemove', handleMouseMove, false);
        canvas.addEventListener('mouseup', handleMouseUp, false);
        canvas.addEventListener('mouseout', handleMouseOut, false);
        canvas.addEventListener('click', refreshCaptcha, false);
    }

    function refreshCaptcha(e) {
        var mousePos = getMousePosition(canvas, e);

        //        ctx.drawImage(refresh,0,0,refresh.width,refresh.height,canvas.width - 80,canvas.height - 80,80,80);

        if ((mousePos.x > canvas.width - 45) && (mousePos.y > canvas.height - 45)) {
            //alert("refresh");
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            load_captcha(divid, url);
        }

    }

    //window.addEventListener('orientationchange', doOnOrientationChange);

    // Initial execution if needed
    //doOnOrientationChange();
}

window.onload = () => {
    load_captcha('gameCanvas', '../images/bg.jpg')
}