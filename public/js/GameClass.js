//--------------------------DIMENTIONS-----------
const canvasHeight = 1000
const canvasWidth = 1000
const viewColumnNum = 10
const viewLineNum = 10
const cellWidth = canvasWidth / viewColumnNum
const cellheight = canvasHeight / viewLineNum
//---------------------------------------------
const recordRate = 500

//--------------------------Ground Values-----------
const floorValue = 1
const endValue = 11
const startValue = 10
const wallValue = 0
//---------------------------------------------

class Game {
  constructor(id, grid2D = [], player = {}, historic = []) {
    this.id = id
    this.grid2D = grid2D
    this.chronometer = new Chronometer()
    this.gameInterval = null
    this.frameRate = 100
    this.bullets = []
    this.player = player
    this.player.game = this
    this.historic = historic
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
    const ind = this.getHistoricInd()
    this.historic.forEach((otherPlayer) => {
      const coord = otherPlayer.playerMove[ind]
      if (coord) {
        if (this.isInView(coord.x, coord.y, this.player.position)) {
          this.drawOtherPlayer(coord.x- xOffset   ,coord.y- yOffset  )
        }
        this.checkVictory({ ...otherPlayer, position: coord })
      }
    })
    this.bullets.forEach((bullet) => {
      if (this.isInView(bullet.x, bullet.y, this.player.position)) bullet.draw(xOffset, yOffset)
    })
  }

  drawCell(cellInd, lineInd, canvasIndX, canvasIndY) {
    // console.log({cellInd, lineInd});
    if (this.isWall(cellInd, lineInd)) {
      ctx.fillStyle = colors.wall
    } else {
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
    this.player.drawBIG(this.player.position.x, this.player.position.y, cellWidth, cellheight)
    const ind = this.getHistoricInd()
    this.historic.forEach((otherPlayer) => {
      const coord = otherPlayer.playerMove[ind]
      if (coord) {
        this.player.drawBIG(coord.x, coord.y, cellWidth, cellheight)
      }
    })
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
    ctx.fillStyle = colors.player
    ctx.beginPath()
    console.log({x, y});
    ctx.arc(x*cellWidth - playerSize, y*cellheight - playerSize, playerSize, 0, 2 * Math.PI)
    ctx.closePath()
    ctx.fill()
  }

  isWall(x, y) {
    if (x < 0 || y < 0 || y >= this.grid2D.length || x >= this.grid2D[0].length) return true
    return this.grid2D[Math.floor(y)][Math.floor(x)] === wallValue
  }

  isPlayer(xBullet, yBullet) {
    const ind = this.getHistoricInd()
    const deadPlayerInd = this.historic.findIndex(
      (el) =>
        xBullet > el[ind].x - playerSize &&
        xBullet < el[ind].x + playerSize &&
        yBullet > el[ind].y - playerSize &&
        yBullet < el[ind].y + playerSize
    )
    if (deadPlayerInd > -1) {
      this.historic.splice(deadPlayerInd, 1)
      return true
    }
    return this.grid2D[y][x]
  }

  runGameLoop() {
    this.chronometer.start(clockEl)
    this.player.startLogs(recordRate)
    this.player.startMove(this)
    this.gameInterval = setInterval(() => {
      this.clearCanvas()
      this.drawMazeBIG()
      this.drawMaze()
      this.player.newCoord()
      this.checkEndGame()
    }, this.frameRate)
  }

  getHistoricInd() {
    const index = Math.floor((this.chronometer.currentTime * 10) / recordRate)
    return index
  }

  clearCanvas() {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight)
  }

  pauseGame() {
    this.chronometer.stop()
    this.player.stopLogs()
    this.player.stopMove()
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
  checkVictory(player) {
    const cell = this.grid2D[Math.floor(player.position.y)][Math.floor(player.position.x)]
    const isInVictoryInd = this.playerVistory.findIndex((el) => el.id === player.id)
    if (isInVictoryInd > -1) {
      if (cell !== endValue) {
        this.playerVistory.splice(isInVictoryInd, 1)
      }
    } else {
      if (cell === endValue) {
        this.playerVistory.push(player)
      }
    }
  }
  async checkEndGame() {
    if (this.chronometer.timeLeft < 0) {
      this.pauseGame()
      const historic = {
        playerIND: this.player.id,
        user: this.player.userID,
        playerName: this.player.name,
        map: this.id,
        playerMove: this.player.logs,
      }
      console.log({ historic })
      try {
        await gameAPI.sendGame(historic)
      } catch (error) {
        console.log({ error })
      }
    }
  }
}
