!function () { function t(t) { return k ? k + t : t.toLowerCase() } function e(t) { return t = t.toLowerCase(), w ? w + t : t } function n(t) { h = t.getPrize, E = t.gotBack, t.config(function (e) { v = t.prizes = e, p = v.length, i(t) }), s() } function i(t) { if (t = t || {}, t.id && p >>> 0 !== 0) { var e, n = t.id, i = 360 / p / 2 + 90, r = document.createElement("ul"), s = 1 / p, o = []; if (b = d(n), g = b.querySelector(".gb-turntable-canvas"), m = b.querySelector(".gb-turntable-container"), y = b.querySelector(".gb-turntable-btn"), !g.getContext) return void a("抱歉！浏览器不支持。"); e = g.getContext("2d"); for (var c = 0; c < p; c++)e.save(), e.beginPath(), e.translate(150, 150), e.moveTo(0, 0), e.rotate((360 / p * c - i) * Math.PI / 180), e.arc(0, 0, 150, 0, 2 * Math.PI / p, !1), c % 2 == 0 ? e.fillStyle = "#ffb820" : e.fillStyle = "#ffcb3f", e.fill(), e.lineWidth = .5, e.strokeStyle = "#e4370e", e.stroke(), e.restore(), o.push('<li class="gb-turntable-item"> <span style="' + P + ": rotate(" + c * s + 'turn)">' + t.prizes[c] + "</span> </li>"), c + 1 === p && (r.className = "gb-turntalbe-list", m.appendChild(r), r.innerHTML = o.join("")) } } function a(t) { alert(t) } function r(t) { m.style[P] = "rotate(" + t + "deg)" } function s() { c(y, "click", function () { u(y, "disabled"), h(function (t) { L = { prizeId: t[0], chances: t[1] }, T = T || 0, T = T + (360 - T % 360) + (3600 - t[0] * (360 / p)), r(T) }), c(m, S, o) }) } function o() { L.chances && f(y, "disabled"), E(v[L.prizeId]) } function c(t, e, n) { "function" == typeof addEventListener ? t.addEventListener(e, n, !1) : t.attachEvent && t.attachEvent("on" + e, n) } function l(t, e) { return !(!t || !e) && (t.classList ? t.classList.contains(e) : t.className.match(new RegExp("(\\s|^)" + e + "(\\s|$)"))) } function u(t, e) { t.classList ? t.classList.add(e) : l(t, e) || (t.className += "" + e) } function f(t, e) { t.classList ? t.classList.remove(e) : t.className = t.className.replace(new RegExp("(^|\\b)" + className.split(" ").join("|") + "(\\b|$)", "gi"), " ") } var d, b, m, g, p, v, y, h, E, L, w, k, T = 0, z = { "": "", Webkit: "webkit", Moz: "", O: "o", ms: "ms" }, C = document.createElement("p"), N = {}; Object.keys(z).some(function (t) { if (void 0 !== C.style[t + "TransitionProperty"]) return w = t ? "-" + t.toLowerCase() + "-" : "", k = z[t], !0 }), N = { cssPrefix: w, transform: e("Transform"), transitionEnd: t("TransitionEnd") }; var P = N.transform, S = N.transitionEnd; d = function (t) { return document.getElementById(t) }; var x = { init: function (t) { return n(t) } }; void 0 === window.gbTurntable && (window.gbTurntable = x), "function" == typeof define && define.amd && define("GB-canvas-turntable", [], function () { return x }) }();

document.addEventListener('DOMContentLoaded', function () {
    gbTurntable.init({
        id: 'turntable',
        config: function (callback) {
            // 获取奖品信息
            callback && callback(['1元红包', '2元红包', '3元红包', '4元红包', '5元红包', '6元红包']);
        },
        getPrize: function (callback) {
            // 获取中奖信息
            var num = Math.random() * 6 >>> 0,   //奖品ID
                chances = num;  // 可抽奖次数
            callback && callback([num, chances]);
        },
        gotBack: function (data) {
            alert('恭喜抽中' + data);
        }
    })


}, false)

//横竖屏
var updateOrientation = function () { if (window.orientation == '-90' || window.orientation == '90') alert('为了更好的体验，请将手机/平板竖过来！'); };
window.onorientationchange = updateOrientation;

//设置cookie
function setCookie(cookiename, cookievalue, hours) {
    var date = new Date();
    date.setTime(date.getTime() + Number(hours) * 3600 * 1000);
    document.cookie = cookiename + "=" + cookievalue + "; path=/;expires = " + date.toGMTString();
}

//获取cookie
function getCookie(cookiename) {
    var preg = new RegExp("(^| )" + cookiename + "=([^;]*)(;|$)", "g");
    if (preg.test(document.cookie)) {
        return RegExp.$2;
    } else {
        return "";
    }
}

//清除cookie  
function clearCookie(cookiename) {
    setCookie(cookiename, "", -1);
}

//随机数
function rnd(n, m) {
    return Math.floor(Math.random() * (m - n + 1) + n);
}


var canvas = document.getElementById("lotterys"), w = h = 300;
var ctx = canvas.getContext("2d");
var _lottery = {
    title: [],			 //奖品名称
    colors: [],			 //奖品区块对应背景颜色
    endColor: '#FF5B5C', //中奖后区块对应背景颜色
    outsideRadius: 140,	 //外圆的半径
    insideRadius: 30,	 //内圆的半径
    textRadius: 105,	 //奖品位置距离圆心的距离
    startAngle: 0,		 //开始角度
    isLock: false		 //false:停止; ture:旋转
};

window.onload = function () {

    //动态添加大转盘的奖品与奖品区域背景颜色
    _lottery.title = ["奖品一", "奖品二", "奖品三", "谢谢参与", "奖品四", "奖品五", "奖品六 ", "谢谢参与"]
    _lottery.colors = ["#fe807d", "#fe7771", "#fe807d", "#fe7771", "#fe807d", "#fe7771", "#fe807d", "#fe7771"]

    drawLottery()
}

//画出转盘
function drawLottery(lottery_index) {
    if (canvas.getContext) {
        var arc = Math.PI / (_lottery.title.length / 2); //根据奖品个数计算圆周角度
        ctx.clearRect(0, 0, w, h); //在给定矩形内清空一个矩形
        ctx.strokeStyle = "#e95455"; //strokeStyle 属性设置或返回用于笔触的颜色、渐变或模式  
        ctx.font = '16px Microsoft YaHei'; //font 属性设置或返回画布上文本内容的当前字体属性
        for (var i = 0; i < _lottery.title.length; i++) {
            var angle = _lottery.startAngle + i * arc;
            ctx.fillStyle = _lottery.colors[i];

            //创建阴影（两者同时使用） shadowBlur:阴影的模糊级数   shadowColor:阴影颜色 【注：相当耗费资源】
            //ctx.shadowBlur = 1;  
            //ctx.shadowColor = "#fff";  

            ctx.beginPath();
            //arc(x,y,r,起始角,结束角,绘制方向) 方法创建弧/曲线（用于创建圆或部分圆）  
            ctx.arc(w / 2, h / 2, _lottery.outsideRadius, angle, angle + arc, false);
            ctx.arc(w / 2, h / 2, _lottery.insideRadius, angle + arc, angle, true);
            ctx.stroke();
            ctx.fill();
            ctx.save();

            //----绘制奖品开始----
            //中奖后改变背景色
            if (lottery_index != undefined && i == lottery_index) {
                ctx.fillStyle = _lottery.endColor;
                ctx.fill();
            }
            ctx.fillStyle = "#fff";

            var text = _lottery.title[i], line_height = 17, x, y;
            x = w / 2 + Math.cos(angle + arc / 2) * _lottery.textRadius;
            y = h / 2 + Math.sin(angle + arc / 2) * _lottery.textRadius;
            ctx.translate(x, y); //translate方法重新映射画布上的 (0,0) 位置
            ctx.rotate(angle + arc / 2 + Math.PI / 2); //rotate方法旋转当前的绘图
            ctx.fillText(text, -ctx.measureText(text).width / 2, 0); //measureText()方法返回包含一个对象，该对象包含以像素计的指定字体宽度
            ctx.restore(); //把当前画布返回（调整）到上一个save()状态之前 
            //----绘制奖品结束----
        }
    }
}

//旋转转盘  angles：角度; item：奖品位置; txt：提示语;
var rotateFn = function (item, angles, txt) {
    _lottery.isLock = !_lottery.isLock;
    $lottery.stopRotate();
    $lottery.rotate({
        angle: 0,
        animateTo: angles + 1800,
        duration: 8000,
        callback: function () {
            setCookie('LOTTERY_TOTAL_NUM', total_num, 24); //记录剩余次数
            $modal.hide();
            drawLottery(item); //中奖后改变背景颜色
            if (item == 3 || item == 7) {
                $popover.show().find('.m4').show();
            } else {
                $popover.show().find('.m5').show().find('font').text(txt);
                record_log(txt); //插入我的中奖纪录
            }
            changeNum(total_num);
            _lottery.isLock = !_lottery.isLock;
        }
    });
};

//开始抽奖
function lottery() {
    if (_lottery.isLock) { showToast('心急吃不了热豆腐哦'); return; }
    $modal.hide();
    if (total_num <= 0) {
        $popover.show().find('.m3').show();
        total_num = 0;
    } else {
        var angels = [247, 202, 157, 112, 67, 22, 337, 292]; //对应角度
        drawLottery();
        item = rnd(0, 7);
        rotateFn(item, angels[item], _lottery.title[item]);
        total_num--;
    }
}
