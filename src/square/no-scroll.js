
class NoScroll extends Game {
    constructor() {
        super(document.getElementById('gameCanvas'))
        this.map = {
            cols: 8,
            rows: 8,
            tsize: 64,
            tiles: [
                1, 3, 3, 3, 1, 1, 3, 1,
                1, 1, 1, 1, 1, 1, 1, 1,
                1, 2, 1, 1, 1, 1, 2, 1,
                1, 1, 2, 1, 1, 2, 1, 1,
                1, 1, 1, 2, 2, 1, 1, 1,
                1, 1, 1, 1, 2, 1, 1, 1,
                1, 1, 1, 1, 2, 1, 1, 1,
                1, 1, 1, 1, 1, 1, 1, 1
            ],
            getTile: function (col, row) {
                return this.tiles[row * this.cols + col]
            }
        }
    }
    load() {
        return [
            this.loadImage('tiles', '../../images/tiles.png')
        ]
    }
    init() {
        this.tileAtlas = this.getImage('tiles')
    }
    render() {
        const map = this.map
        for (let c = 0; c < map.cols; c++) {
            for (let r = 0; r < map.rows; r++) {
                let tile = map.getTile(c, r)
                if (tile) {
                    this.ctx.drawImage(
                        this.tileAtlas,
                        (tile - 1) * map.tsize,
                        0,
                        map.tsize,
                        map.tsize,
                        c * map.tsize,
                        r * map.tsize,
                        map.tsize,
                        map.tsize
                    )
                }

            }

        }
    }
}

window.onload = () => {
    const noScroll = new NoScroll()
    noScroll.start()
}