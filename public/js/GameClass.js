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
    this.gameInterval = null // for player movemetn refresh rate
    this.frameRate = 200
    // this.chronometer = new Chronometer()
    this.bullets = []
    this.player = player
    this.player.game = this
  }
  drawMaze() {
    const xOffset = Math.floor(this.player.position.x)
    const yOffset = Math.floor(this.player.position.y)
    for (let y = 0; y < heigthCellNumber; y++) {
      for (let x = 0 ; x < widthCellNumber; x++) {
        const cellInd = x + xOffset
        const lineInd = y + yOffset
        this.drawCell(cellInd, lineInd, x, y)
      }
    }
    this.player.draw()
    // this.bullets.forEach((bullet) => {
    //   bullet.draw(this.xOffset, this.scale)
    // })
  }
	drawCell(cellInd, lineInd, canvasIndX, canvasIndY) {
		ctx.fillStyle = this.isWall(cellInd, lineInd) ? colors.wall : colors.floor
		const x =
    canvasIndX * cellWidth +
			canvasWidth / 2 -
			(canvasWidth) / 2
		const y = canvasIndY * cellheight
		ctx.beginPath()
		ctx.fillRect(x, y, cellWidth, cellheight)
    //console.log({cellInd, lineInd})
	}

  isWall(x, y) {
    if (
      x < 0 ||
      y < 0 ||
      y > this.grid2D.length ||
      x > this.grid2D[0].length
    )
      return true
    //console.log(' this.grid2D[y][x]',  this.grid2D[y][x]);
    return this.grid2D[y][x]
  }

  runGameLoop() {
    this.gameInterval = setInterval(() => {
      this.clearCanvas()
      this.drawMaze()
      this.player.draw()
      this.player.newCoord()
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