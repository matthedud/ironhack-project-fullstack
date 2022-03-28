//--------------------------DIMENTIONS-----------
const canvasHeight = 500
const canvasWidth = 1000
const widthCellNumber = 10
const heigthCellNumber = 10
cellWidth = canvasWidth / widthCellNumber
cellheight = canvasHeight /  heigthCellNumber
//---------------------------------------------


class Game {
  constructor(grid2D = [], player=null) {
    this.grid2D = grid2D
    this.scale = 0.3
    this.gameInterval = null // for player movemetn refresh rate
    this.frameRate = 500
    // this.chronometer = new Chronometer()
    this.bullets = []
    this.player = player
  }
  drawMaze() {
    for (let y = 0; y < heigthCellNumber; y++) {
      for (let x = 0 ; x < widthCellNumber; x++) {
        const cellInd = x + this.player.position.x
        const lineInd = x + this.player.position.y
        this.drawCell(this.grid2D[lineInd][cellInd], x, y)
      }
    }
    // this.player.draw()
    // this.bullets.forEach((bullet) => {
    //   bullet.draw(this.xOffset, this.scale)
    // })
  }

  drawCell(cell, x, y) {
    ctx.fillStyle = cell ? colors.minimapWall : colors.minimapFloor
    ctx.beginPath()
    ctx.fillRect(x, y, this.cellWidth, this.cellheight)
  }

  isWall(x, y) {
    const cellIndex = Math.floor(x / this.cellWidth)
    const lineIndex = Math.floor(y / this.cellheight)
    if (
      lineIndex < 0 ||
      cellIndex < 0 ||
      lineIndex > this.grid2D.length ||
      cellIndex > this.grid2D[0].length
    )
      return true
    return this.grid2D[lineIndex][cellIndex]
  }

  runGameLoop() {
    this.gameInterval = setInterval(() => {
      this.clearCanvas()
      this.drawMaze()
    }, this.frameRate)
  }
  clearCanvas(){
    ctx.clearRect(0, 0, canvasWidth, canvasHeight)
  }
  pauseGame() {
    // this.chronometer.stop()
    clearInterval(this.gameInterval)
    this.gameInterval = null
  }
}