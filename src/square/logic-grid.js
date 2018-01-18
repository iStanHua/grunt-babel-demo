class LogicGrid extends Game {
    constructor() {
        super(document.getElementById('gameCanvas'))
        this.map = {
            cols: 12,
            rows: 12,
            tsize: 64,
            layers: [[
                3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3,
                3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3,
                3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3,
                3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3,
                3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3,
                3, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 3,
                3, 1, 2, 2, 1, 1, 1, 1, 1, 1, 1, 3,
                3, 1, 2, 2, 1, 1, 1, 1, 1, 1, 1, 3,
                3, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 3,
                3, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 3,
                3, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 3,
                3, 3, 3, 1, 1, 2, 3, 3, 3, 3, 3, 3
            ], [
                4, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4,
                4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4,
                4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4,
                4, 0, 0, 5, 0, 0, 0, 0, 0, 5, 0, 4,
                4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4,
                4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4,
                4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4,
                4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4,
                4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4,
                4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4,
                4, 4, 4, 0, 5, 4, 4, 4, 4, 4, 4, 4,
                4, 4, 4, 0, 0, 3, 3, 3, 3, 3, 3, 3
            ]],
            getTile: function (layer, col, row) {
                return this.layers[layer][row * this.cols + col]
            },
            isSolidTileAtXY: function (x, y) {
                let col = this.getCol(x)
                let row = this.getCol(y)

                // tiles 3 and 5 are solid -- the rest are walkable
                // loop through all layers and return TRUE if any tile is solid
                return this.layers.reduce(function (res, layer, index) {
                    let tile = this.getTile(index, col, row)
                    let isSolid = tile === 3 || tile === 5
                    return res || isSolid
                }.bind(this), false)
            },
            getCol: function (x) {
                return Math.floor(x / this.tsize)
            },
            getRow: function (y) {
                return Math.floor(y / this.tsize)
            },
            getX: function (col) {
                return col * this.tsize
            },
            getY: function (row) {
                return row * this.tsize
            }
        }
    }
    load() {
        return [
            this.loadImage('tiles', '../../images/tiles.png'),
            this.loadImage('hero', '../../images/character.png')
        ]
    }
    init() {
        this.keyboard.listenForEvents(
            [
                this.keyboard.LEFT,
                this.keyboard.RIGHT,
                this.keyboard.UP,
                this.keyboard.DOWN
            ]
        )

        this.tileAtlas = this.getImage('tiles')

        this.hero = new Hero(this.map, 160, 160)

        this.camera = new Camera(this.map, 512, 512)
        this.camera.follow(this.hero)

    }
    update(delta) {
        // handle hero movement with arrow keys
        let dirx = 0
        let diry = 0
        if (this.keyboard.isDown(this.keyboard.LEFT)) { dirx = -1 }
        else if (this.keyboard.isDown(this.keyboard.RIGHT)) { dirx = 1 }
        else if (this.keyboard.isDown(this.keyboard.UP)) { diry = -1 }
        else if (this.keyboard.isDown(this.keyboard.DOWN)) { diry = 1 }

        this.hero.move(delta, dirx, diry)
        this.camera.update()
    }
    _drawLayer(layer) {
        const map = this.map
        let startCol = Math.floor(this.camera.x / map.tsize)
        let endCol = startCol + (this.camera.width / map.tsize)
        let startRow = Math.floor(this.camera.y / map.tsize)
        let endRow = startRow + (this.camera.height / map.tsize)
        let offsetX = -this.camera.x + startCol * map.tsize
        let offsetY = -this.camera.y + startRow * map.tsize

        for (let c = startCol; c <= endCol; c++) {
            for (let r = startRow; r <= endRow; r++) {
                let tile = map.getTile(layer, c, r)
                let x = (c - startCol) * map.tsize + offsetX
                let y = (r - startRow) * map.tsize + offsetY

                if (tile) {
                    this.ctx.drawImage(
                        this.tileAtlas,
                        (tile - 1) * map.tsize,
                        0,
                        map.tsize,
                        map.tsize,
                        Math.round(x),
                        Math.round(y),
                        map.tsize,
                        map.tsize
                    )
                }
            }
        }
    }
    _drawGrid() {
        let width = this.map.cols * this.map.tsize
        let height = this.map.rows * this.map.tsize
        let x, y

        for (let r = 0; r < this.map.rows; r++) {
            x = -this.camera.x
            y = r * this.map.tsize - this.camera.y
            this.ctx.beginPath()
            this.ctx.moveTo(x, y)
            this.ctx.lineTo(width, y)
            this.ctx.stroke()
        }

        for (let c = 0; c < this.map.cols; c++) {
            x = c * this.map.tsize - this.camera.x
            y = -this.camera.y
            this.ctx.beginPath()
            this.ctx.moveTo(x, y)
            this.ctx.lineTo(x, height)
            this.ctx.stroke()
        }
    }
    render() {
        this._drawLayer(0)

        this.ctx.drawImage(
            this.getImage('hero'),
            this.hero.screenX - this.hero.width / 2,
            this.hero.screenY - this.hero.height / 2)

        this._drawLayer(1)

        this._drawGrid()
    }
}

class Camera {
    constructor(map, width, height) {
        this.x = 0
        this.y = 0
        this.width = width
        this.height = height
        this.maxX = map.cols * map.tsize - width
        this.maxY = map.rows * map.tsize - height
    }

    follow(sprite) {
        this.following = sprite
        sprite.screenX = 0
        sprite.screenY = 0
    }
    update() {
        // assume followed sprite should be placed at the center of the screen
        // whenever possible
        this.following.screenX = this.width / 2
        this.following.screenY = this.height / 2

        // make the camera follow the sprite
        this.x = this.following.x - this.width / 2
        this.y = this.following.y - this.height / 2

        // clamp values
        this.x = Math.max(0, Math.min(this.x, this.maxX))
        this.y = Math.max(0, Math.min(this.y, this.maxY))

        // in map corners, the sprite cannot be placed in the center of the screen
        // and we have to change its screen coordinates
        // left and right sides
        if (this.following.x < this.width / 2 ||
            this.following.x > this.maxX + this.width / 2) {
            this.following.screenX = this.following.x - this.x
        }

        // top and bottom sides
        if (this.following.y < this.height / 2 ||
            this.following.y > this.maxY + this.height / 2) {
            this.following.screenY = this.following.y - this.y
        }
    }
}

class Hero {
    constructor(map, x, y) {
        this.map = map
        this.x = x
        this.y = y
        this.width = map.tsize
        this.height = map.tsize

        this.SPEED = 256  // 像素每秒
    }

    move(delta, dirx, diry) {
        // move hero
        this.x += dirx * this.SPEED * delta
        this.y += diry * this.SPEED * delta

        this._collide(dirx, diry)

        let maxX = this.map.cols * this.map.tsize
        let maxY = this.map.rows * this.map.tsize

        // clamp values
        this.x = Math.max(0, Math.min(this.x, maxX))
        this.y = Math.max(0, Math.min(this.y, maxY))
    }

    _collide(dirx, diry) {
        let col, row

        // -1 in right and bottom is because image ranges from 0..63
        // and not up to 64
        let left = this.x - this.width / 2
        let right = this.x + this.width / 2 - 1
        let top = this.y - this.height / 2
        let bottom = this.y + this.height / 2 - 1

        // check for collisions on sprite sides
        let collision =
            this.map.isSolidTileAtXY(left, top) ||
            this.map.isSolidTileAtXY(right, top) ||
            this.map.isSolidTileAtXY(right, bottom) ||
            this.map.isSolidTileAtXY(left, bottom)
        if (!collision) return
        console.log(dirx)
        if (diry > 0) {
            row = this.map.getRow(bottom)
            this.y = - this.height / 2 + this.map.getY(row)
        }
        else if (diry < 0) {
            row = this.map.getRow(top)
            this.y = this.height / 2 + this.map.getY(row + 1)
        }
        else if (dirx > 0) {
            col = this.map.getCol(right)
            this.x = -this.width / 2 + this.map.getX(col)
        }
        else if (dirx < 0) {
            col = this.map.getCol(left)
            this.x = this.width / 2 + this.map.getX(col + 1)
        }
    }
}

window.onload = () => {
    const logicGrid = new LogicGrid()
    logicGrid.start()

    var speechSU = new window.SpeechSynthesisUtterance()
    speechSU.text = '你好，世界！logic grid'
    window.speechSynthesis.speak(speechSU)
}