
class Scroll extends Game {
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
        this.keyboard = new Keyboard()
        this.keyboard.listenForEvents([this.keyboard.LEFT, this.keyboard.RI
            , this.keyboard.UP, this.keyboard.DOWN])
        this.tileAtlas = this.getImage('tiles')
        this.camera = new Camera(this.map, 512, 512)
    }
    update(delta) {
        let dirx = 0
        let diry = 0
        if (this.keyboard.isDown(this.keyboard.LEFT)) { dirx = -1 }
        if (this.keyboard.isDown(this.keyboard.RIGHT)) { dirx = 1 }
        if (this.keyboard.isDown(this.keyboard.UP)) { diry = -1 }
        if (this.keyboard.isDown(this.keyboard.DOWN)) { diry = 1 }
        this.camera.move(delta, dirx, diry)
    }
    _drawLayer(layer) {
        const map = this.map
        for (let c = 0; c < map.cols; c++) {
            for (let r = 0; r < map.rows; r++) {
                let tile = map.getTile(layer, c, r)
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
    render() {
        this._drawLayer(0)
        this._drawLayer(1)
    }
}

window.onload = () => {
    const scroll = new Scroll()
    scroll.start()
}