
// var requestAnimationFrame = window.requestAnimationFrame ||
//     window.webkitRequestAnimationFrame ||
//     window.mozRequestAnimationFrame ||
//     window.oRequestAnimationFrame ||
//     window.msRequestAnimationFrame ||
//     function (callback) {
//         window.setTimeout(callback, 1000 / 60)
//     }

// var cancelAnimationFrame = window.cancelAnimationFrame ||
//     window.mozCancelAnimationFrame ||
//     function (timer) {
//         clearTimeout(timer)
//     }

// class Loader {
//     constructor() {
//         this.images = {}
//     }

//     loadImage(key, src) {
//         let img = new Image()
//         let p = new Promise(function (resolve, reject) {
//             img.onload = function () {
//                 this.images[key] = img
//                 resolve(img)
//             }.bind(this)
//             img.onerror = () => {
//                 reject('Could not load image：' + src)
//             }
//         }.bind(this))
//         img.src = src
//         return p
//     }
//     getImage(key) {
//         return (key in this.images) ? this.images[key] : null
//     }
// }

// class Keyboard {
//     constructor() {
//         this.LEFT = 37
//         this.RIGHT = 39
//         this.UP = 38
//         this.DOWN = 40
//         this._keys = {}
//     }
//     listenForEvents(keys) {
//         window.addEventListener('keydown', this._onKeyDown.bind(this))
//         window.addEventListener('keyup', this._onKeyUp.bind(this))
//         keys.forEach(function (key) {
//             this._keys[key] = false
//         }.bind(this))
//     }
//     _onKeyDown(event) {
//         let keyCode = event.keyCode
//         if (keyCode in this._keys) {
//             event.preventDefault()
//             this._keys[keyCode] = true
//         }
//     }
//     _onKeyUp(event) {
//         let keyCode = event.keyCode
//         if (keyCode in this._keys) {
//             event.preventDefault()
//             this._keys[keyCode] = false
//         }
//     }
//     isDown(keyCode) {
//         if (!keyCode in this._keys)
//             throw new Error('Keycode ' + keyCode + ' is not being listened to')
//         return this._keys[keyCode]
//     }
// }

// class Game {
//     constructor(context) {
//         this.ctx = context
//         this._previousElapsed = 0
//     }
//     run() {
//         let p = this.load()
//         Promise.all(p).then(function (loaded) {
//             this.init()
//             requestAnimationFrame(this.tick)
//         }.bind(this))
//     }
//     tick(elapsed) {
//         requestAnimationFrame(this.tick)

//         // 清除前一帧
//         this.ctx.clearRect(0, 0, 512, 512)

//         // 以秒为单位计算增量时间 - 也是上限
//         let delta = (elapsed - this._previousElapsed) / 1000.00
//         delta = Math.min(delta, 0.25) //最大250 ms的增量
//         this._previousElapsed = elapsed

//         this.update(delta)
//         this.render()
//     }
//     init() {

//         return this
//     }
//     update(delta) {

//         return this
//     }
//     render() {

//         return this
//     }
// }

// const loader = new Loader()
// const keyboard = new Keyboard()
// let context = document.getElementById('gameCanvas').getContext('2d')
// const game = new Game(context)
// window.onload = () => {
//     game.run()
// }
//
// Asset loader
//

var Loader = {
    images: {}
};

Loader.loadImage = function (key, src) {
    var img = new Image();

    var d = new Promise(function (resolve, reject) {
        img.onload = function () {
            this.images[key] = img;
            resolve(img);
        }.bind(this);

        img.onerror = function () {
            reject('Could not load image: ' + src);
        };
    }.bind(this));

    img.src = src;
    return d;
};

Loader.getImage = function (key) {
    return (key in this.images) ? this.images[key] : null;
};

//
// Keyboard handler
//

var Keyboard = {};

Keyboard.LEFT = 37;
Keyboard.RIGHT = 39;
Keyboard.UP = 38;
Keyboard.DOWN = 40;

Keyboard._keys = {};

Keyboard.listenForEvents = function (keys) {
    window.addEventListener('keydown', this._onKeyDown.bind(this));
    window.addEventListener('keyup', this._onKeyUp.bind(this));

    keys.forEach(function (key) {
        this._keys[key] = false;
    }.bind(this));
}

Keyboard._onKeyDown = function (event) {
    var keyCode = event.keyCode;
    if (keyCode in this._keys) {
        event.preventDefault();
        this._keys[keyCode] = true;
    }
};

Keyboard._onKeyUp = function (event) {
    var keyCode = event.keyCode;
    if (keyCode in this._keys) {
        event.preventDefault();
        this._keys[keyCode] = false;
    }
};

Keyboard.isDown = function (keyCode) {
    if (!keyCode in this._keys) {
        throw new Error('Keycode ' + keyCode + ' is not being listened to');
    }
    return this._keys[keyCode];
};

//
// Game object
//

var Game = {};

Game.run = function (context) {
    this.ctx = context;
    this._previousElapsed = 0;

    var p = this.load();
    Promise.all(p).then(function (loaded) {
        this.init();
        window.requestAnimationFrame(this.tick);
    }.bind(this));
};

Game.tick = function (elapsed) {
    window.requestAnimationFrame(this.tick);

    // clear previous frame
    this.ctx.clearRect(0, 0, 512, 512);

    // compute delta time in seconds -- also cap it
    var delta = (elapsed - this._previousElapsed) / 1000.0;
    delta = Math.min(delta, 0.25); // maximum delta of 250 ms
    this._previousElapsed = elapsed;

    this.update(delta);
    this.render();
}.bind(Game);

// override these methods to create the demo
Game.init = function () { };
Game.update = function (delta) { };
Game.render = function () { };

//
// start up function
//

window.onload = function () {
    var context = document.getElementById('gameCanvas').getContext('2d');
    Game.run(context);
    console.log(Game)
};
