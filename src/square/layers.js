
class Layers extends Game {
  constructor() {
    super(document.getElementById('gameCanvas'))
    this.map = {
      cols: 8,
      rows: 8,
      tsize: 64,
      layers: [
        [
          3, 3, 3, 3, 3, 3, 3, 3,
          3, 1, 1, 1, 1, 1, 1, 3,
          3, 1, 1, 1, 1, 1, 1, 3,
          3, 1, 1, 1, 1, 1, 1, 3,
          3, 1, 1, 2, 1, 2, 1, 3,
          3, 1, 1, 1, 2, 1, 1, 3,
          3, 1, 1, 1, 2, 1, 1, 3,
          3, 3, 3, 1, 2, 3, 3, 3
        ],
        [
          4, 0, 0, 0, 0, 0, 0, 4,
          4, 0, 0, 0, 0, 0, 0, 4,
          4, 0, 0, 0, 0, 0, 0, 4,
          4, 0, 0, 0, 0, 0, 0, 4,
          4, 0, 0, 0, 5, 0, 0, 4,
          4, 0, 0, 0, 0, 0, 0, 4,
          4, 4, 4, 0, 0, 4, 4, 4,
          0, 0, 0, 0, 0, 0, 0, 0
        ]
      ],
      getTile: function (layer, col, row) {
        return this.layers[layer][row * this.cols + col]
      }
    }
  }
  load() {
    return [
      this.loadImage('tiles', '../../images/tiles.png'),
      this.loadImage('character', '../../images/character.png')
    ]
  }
  init() {
    this.tileAtlas = this.getImage('tiles')
    this.hero = { x: 128, y: 384, image: this.getImage('character') }
  }
  _drawLayer(layer) {
    const map = this.map
    for (let c = 0; c < map.cols; c++) {
      for (let r = 0; r < map.rows; r++) {
        let tile = map.getTile(layer, c, r)
        if (tile) {
          this.ctx.drawImage(this.tileAtlas, (tile - 1) * map.tsize, 0, map.tsize, map.tsize, c * map.tsize, r * map.tsize, map.tsize, map.tsize)
        }
      }
    }
  }
  render() {
    this._drawLayer(0)
    this.ctx.drawImage(this.hero.image, this.hero.x, this.hero.y)
    this._drawLayer(1)
  }
}

window.onload = () => {
  const layers = new Layers()
  layers.start()
}