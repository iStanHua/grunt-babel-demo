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