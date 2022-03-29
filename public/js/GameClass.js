//--------------------------DIMENTIONS-----------
const canvasHeight = 500
const canvasWidth = 1000
const widthCellNumber = 10
const heigthCellNumber = 10
const cellWidth = canvasWidth / widthCellNumber
const cellheight = canvasHeight / heigthCellNumber
//---------------------------------------------
const recordInterval = 50



class Game {
  constructor(grid2D = [], player = {}, historique = []) {
    this.grid2D = grid2D
    this.chronometer = new Chronometer()
    this.gameInterval = null
    this.frameRate = 200
    this.bullets = []
    this.player = player
    this.player.game = this
    this.historique = historique
    this.playerVistory = []

  }
  drawMaze() {
    const xOffset = Math.floor(this.player.position.x + widthCellNumber / 2)
    const yOffset = Math.floor(this.player.position.y + heigthCellNumber / 2)
    for (let y = 0; y < heigthCellNumber; y++) {
      for (let x = 0; x < widthCellNumber; x++) {
        const cellInd = x + xOffset
        const lineInd = y + yOffset
        this.drawCell(cellInd, lineInd, x, y)
      }
    }
    this.player.draw()
    const ind = this.getHistoriqueInd()
    this.historique.forEach((otherPlayer) => {
      if (this.isInView(otherPlayer[ind].x, otherPlayer[ind].y, this.player.position)) {
        this.drawOtherPlayer(otherPlayer.x + xOffset, otherPlayer.y + yOffset)
      }
    })
    this.bullets.forEach((bullet) => {
      if (this.isInView(bullet.x, bullet.y, this.player.position)) bullet.draw(xOffset, yOffset)
    })
  }

  drawCell(cellInd, lineInd, canvasIndX, canvasIndY) {
    ctx.fillStyle = this.isWall(cellInd, lineInd) ? colors.wall : colors.floor
    const x = canvasIndX * cellWidth + canvasWidth / 2 - canvasWidth / 2
    const y = canvasIndY * cellheight
    ctx.beginPath()
    ctx.fillRect(x, y, cellWidth, cellheight)
    console.log({ cellInd, lineInd })
  }

  isInView(x, y, playerPosition) {
    return (
      x > playerPosition.x - widthCellNumber / 2 &&
      x < playerPosition.x + widthCellNumber / 2 &&
      y > playerPosition.y - widthCellNumber / 2 &&
      y < playerPosition.y + widthCellNumber / 2
    )
  }

  drawOtherPlayer(x, y) {
    ctx.fillStyle = color.player
    ctx.beginPath()
    ctx.arc(x - playerSize, y - playerSize, playerSize, 0, 2 * Math.PI)
    ctx.closePath()
    ctx.fill()
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
    if (x < 0 || y < 0 || y > this.grid2D.length || x > this.grid2D[0].length) return true
    return this.grid2D[y][x]
  }

  isPlayer(xBullet, yBullet) {
    const ind = this.getHistoriqueInd()
    const deadPlayerInd = this.historique.findIndex(
      (el) =>
        xBullet > el[ind].x - playerSize &&
        xBullet < el[ind].x + playerSize &&
        yBullet > el[ind].y - playerSize &&
        yBullet < el[ind].y + playerSize
    )
    if (deadPlayerInd > -1) {
      this.historique.splice(deadPlayerInd, 1)
      return true
    }
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

  getHistoriqueInd() {
    const index = Math.round(this.chronometer.currentTime / recordInterval)
    return index
  }


  clearCanvas() {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight)
  }

  pauseGame() {
    // this.chronometer.stop()
    clearInterval(this.gameInterval)
    this.gameInterval = null
  }
}
