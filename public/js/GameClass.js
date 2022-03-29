//--------------------------DIMENTIONS-----------
const canvasHeight = 500
const canvasWidth = 500
const viewColumnNum = 10
const viewLineNum = 10
const cellWidth = canvasWidth / viewColumnNum
const cellheight = canvasHeight / viewLineNum
//---------------------------------------------
const recordInterval = 50

class Game {
  constructor(grid2D = [], player = {}, historique = []) {
    this.grid2D = grid2D
    this.chronometer = new Chronometer()
    this.gameInterval = null
    this.frameRate = 100
    this.bullets = []
    this.player = player
    this.player.game = this
    this.historique = historique
    this.playerVistory = []
  }

  drawMaze() {
    const xOffset =(this.player.position.x-viewColumnNum /2)
    const yOffset =(this.player.position.y-viewLineNum /2)
    for (let y = 0; y <= viewLineNum; y++) {
      for (let x = 0; x <= viewColumnNum; x++) {
        const lineInd = y + yOffset
        const cellInd = x + xOffset
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
  }

  //-----------------------------------------------------

  drawMazeBIG() {
    const cellWidth = canvasWidth / this.grid2D[0].length
    const cellheight = canvasHeight / this.grid2D.length
    this.grid2D.forEach((line, lineInd) => {
      line.forEach((cell, cellInd) => {
        this.drawCellBIG(cell, cellInd, lineInd, cellWidth, cellheight)
      })
    })
    this.player.drawBIG(cellWidth, cellheight)
  }
  drawCellBIG(cell, cellInd, lineInd, cellWidth, cellheight) {
    context.fillStyle = cell ? colors.wall : colors.floor
    const x = cellInd * cellWidth + canvasWidth / 2 - canvasWidth / 2
    const y = lineInd * cellheight
    context.beginPath()
    context.fillRect(x, y, cellWidth, cellheight)
  }
  //-----------------------------------------------------

  isInView(x, y, playerPosition) {
    return (
      x > playerPosition.x - viewColumnNum / 2 &&
      x < playerPosition.x + viewColumnNum / 2 &&
      y > playerPosition.y - viewLineNum / 2 &&
      y < playerPosition.y + viewLineNum / 2
    )
  }

  drawOtherPlayer(x, y) {
    ctx.fillStyle = color.player
    ctx.beginPath()
    ctx.arc(x - playerSize, y - playerSize, playerSize, 0, 2 * Math.PI)
    ctx.closePath()
    ctx.fill()
  }

  isWall(x, y) {
    if (x < 0 || y < 0 || y >= this.grid2D.length || x >= this.grid2D[0].length) return true

    return this.grid2D[Math.floor(y)][Math.floor(x)]
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
    return this.grid2D[y][x]
  }

  runGameLoop() {
    this.gameInterval = setInterval(() => {
      this.clearCanvas()
      this.drawMazeBIG()
      this.drawMaze()
      this.player.newCoord()
    }, this.frameRate)
  }

  getHistoriqueInd() {
    const index = Math.round(this.chronometer.currentTime / recordInterval)
    return index
  }

  clearCanvas() {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight)
  }

  pauseGame() {
    this.chronometer.stop()
    clearInterval(this.gameInterval)
    this.gameInterval = null
  }
}
