window.onload = () => {
    const slider = new Slider(document.getElementById('slider'), 10, function (value) {
        console.log(value)
    })
}

// 求和
let sum = [0, 1, 2, 3, 4].reduce(function (accumulator, currentValue, currentIndex, array) {
    // console.log('accumulator:' + accumulator)
    // console.log('currentValue:' + currentValue)
    // console.log('currentIndex:' + currentIndex)
    return accumulator + currentValue
}, 10)
console.log(sum)

// 将二维数组转化为一维
var flattened = [[0, 1], [2, 3], [4, 5]].reduce(
    (acc, cur) => acc.concat(cur),
    []
)
console.log(flattened)

// 计算数组中每个元素出现的次数
var names = ['Alice', 'Bob', 'Tiff', 'Bruce', 'Alice']
var countedNames = names.reduce(function (allNames, name) {
    if (name in allNames) {
        allNames[name]++
    }
    else {
        allNames[name] = 1
    }
    return allNames
}, {})
console.log(countedNames)

// 使用扩展运算符和initialValue绑定包含在对象数组中的数组
var friends = [{
    name: 'Anna',
    books: ['Bible', 'Harry Potter'],
    age: 21
}, {
    name: 'Bob',
    books: ['War and peace', 'Romeo and Juliet'],
    age: 26
}, {
    name: 'Alice',
    books: ['The Lord of the Rings', 'The Shining'],
    age: 18
}]

var allbooks = friends.reduce(function (prev, curr) {
    return [...prev, ...curr.books]
}, ['Alphabet'])
console.log(allbooks)

// 数组去重
let arr = [1, 2, 1, 2, 3, 5, 4, 5, 3, 4, 4, 4, 4];
let result = arr.sort().reduce((init, current) => {
    if (init.length === 0 || init[init.length - 1] !== current) {
        init.push(current)
    }
    return init
}, [])
console.log(result)

window.onload = function () {
    function select() {//获取到选中的文字函数
        return document.selection ? document.selection.createRange().text : window.getSelection().toString();//IE与标准
    }

    var text = document.getElementById('share');
    var sharebutton = document.getElementById('share_button');

    text.onmouseup = function () {
        var ev = ev || window.event;
        var l = document.body.scrollLeft > 0 ? document.body.scrollLeft : document.documentElement.scrollLeft;
        var t = document.body.scrollTop > 0 ? document.body.scrollTop : document.documentElement.scrollTop;
        l += ev.clientX;//计算分享按钮的left值
        t += ev.clientY;//计算分享按钮的top值
        if (select().length > 10) {
            setTimeout(function () {//解决IE下文本选中不正确的问题
                share_button.style.display = 'block';
                share_button.style.left = l + 'px';
                share_button.style.top = t + 'px';
            }, 100);

        } else {
            share_button.style.display = 'none';//小于10个字不分享
        }
        document.onclick = function () {//点击页面
            share_button.style.display = 'none';//分享按钮消失
        }
        text.onclick = function () {//点击文本时阻止document.onclick
            var ev = ev || window.event;
            ev.cacelBubble = true;
        }

        share_button.onclick = function () {//http请求分享到新浪微博
            window.location.href = "http://service.weibo.com/share/share.php?title=" + select() + "&url=" + window.location.href;
        }
    }
}