
class Offcanvas extends Game {
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
            }
        }
    }

    load() {
        return [
            this.loadImage('tiles', '../../images/tiles.png')
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
        this.camera = new Camera(this.map, 512, 512)

        // create a canvas for each layer
        this.layerCanvas = this.map.layers.map(function () {
            let c = document.createElement('canvas')
            c.width = 512
            c.height = 512
            return c
        })

        this._drawMap()
    }

    update(delta) {
        this.hasScrolled = false

        // handle camera movement with arrow keys
        let dirx = 0
        let diry = 0
        if (this.keyboard.isDown(this.keyboard.LEFT)) { dirx = -1 }
        if (this.keyboard.isDown(this.keyboard.RIGHT)) { dirx = 1 }
        if (this.keyboard.isDown(this.keyboard.UP)) { diry = -1 }
        if (this.keyboard.isDown(this.keyboard.DOWN)) { diry = 1 }

        if (dirx || diry) {
            this.camera.move(delta, dirx, diry)
            this.hasScrolled = true
        }
    }

    _drawMap() {
        this.map.layers.forEach(function (layer, index) {
            this._drawLayer(index)
        }.bind(this))
    }

    _drawLayer(layer) {
        let context = this.layerCanvas[layer].getContext('2d')
        context.clearRect(0, 0, 512, 512)

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
                    context.drawImage(
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
    render() {
        // re-draw map if there has been scroll
        if (this.hasScrolled) {
            this._drawMap()
        }

        // draw the map layers into game context
        this.ctx.drawImage(this.layerCanvas[0], 0, 0)
        this.ctx.drawImage(this.layerCanvas[1], 0, 0)
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

        this.SPEED = 256  // 像素每秒
    }

    move(delta, dirx, diry) {
        // move camera
        this.x += dirx * this.SPEED * delta
        this.y += diry * this.SPEED * delta

        // clamp values
        this.x = Math.max(0, Math.min(this.x, this.maxX))
        this.y = Math.max(0, Math.min(this.y, this.maxY))
    }
}

window.onload = () => {
    const offcanvas = new Offcanvas()

    offcanvas.start()
}