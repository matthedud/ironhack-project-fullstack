//--------------------------DIMENTIONS-----------
const canvasHeight = 1000
const canvasWidth = 1000
const viewColumnNum = 10
const viewLineNum = 10
const cellWidth = canvasWidth / viewColumnNum
const cellheight = canvasHeight / viewLineNum
//---------------------------------------------
const recordInterval = 50

//--------------------------Ground Values-----------
const floorValue = 1
const endValue = 11
const startValue = 10
const wallValue = 0
//---------------------------------------------


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
    const xOffset = this.player.position.x - viewColumnNum / 2
    const yOffset = this.player.position.y - viewLineNum / 2
    for (let y = 0; y <= viewLineNum; y++) {
      for (let x = 0; x <= viewColumnNum; x++) {
        const lineInd = Math.floor(y + yOffset)
        const cellInd = Math.floor(x + xOffset)
        this.drawCell(cellInd, lineInd, x, y)
      }
    }
    this.player.draw()
    const ind = this.getHistoriqueInd()
    this.historique.forEach((otherPlayer) => {
      if (this.isInView(otherPlayer[ind].x, otherPlayer[ind].y, this.player.position)) {
        this.drawOtherPlayer(otherPlayer[ind].x + xOffset, otherPlayer[ind].y + yOffset)
      }
      this.checkVictory(otherPlayer[ind])
    })
    this.bullets.forEach((bullet) => {
      if (this.isInView(bullet.x, bullet.y, this.player.position)) bullet.draw(xOffset, yOffset)
    })
  }

  drawCell(cellInd, lineInd, canvasIndX, canvasIndY) {
    // console.log({cellInd, lineInd});
    if (this.isWall(cellInd, lineInd)){
      ctx.fillStyle = colors.wall
    }
    else {
      switch (this.grid2D[lineInd][cellInd]) {
        case floorValue:
          ctx.fillStyle = colors.floor
          break
        case startValue:
          ctx.fillStyle = colors.start
          break
        case endValue:
          ctx.fillStyle = colors.end
          break
      }
    }
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
    switch (cell) {
      case wallValue:
        context.fillStyle = colors.wall
        break
      case floorValue:
        context.fillStyle = colors.floor
        break
      case startValue:
        context.fillStyle = colors.start
        break
      case endValue:
        context.fillStyle = colors.end
        break
    }
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
    return (this.grid2D[Math.floor(y)][Math.floor(x)] === wallValue)
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

  placePlayer() {
    for (let y = 0; y < this.grid2D.length; y++) {
      let x = this.grid2D[y].indexOf(10)
      if (x > -1) {
        this.player.position = { y, x }
      }
    }
  }
  checkVictory(player){
    const cell = this.grid2D[Math.floor(player.position.y)][Math.floor(player.position.x)]
    const isInVictoryInd = this.playerVistory.findIndex(el=>el.id===player.id)
    if(isInVictoryInd>-1) {
      if (cell!==endValue){
        this.playerVistory.splice(isInVictoryInd, 1)
      }
    }else{
      if (cell===endValue){
        this.playerVistory.push(player)
      }
    }
  }
}
