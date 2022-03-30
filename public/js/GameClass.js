//--------------------------DIMENTIONS-----------
const canvasHeight = 500
const canvasWidth = 500

const viewColumnNum = 10
const viewLineNum = 10
const cellWidth = canvasWidth / viewColumnNum
const cellheight = canvasHeight / viewLineNum
//---------------------------------------------

//--------------------------Ground Values-----------
const floorValue = 1
const endValue = 11
const startValue = 10
const wallValue = 0
//--------------------------------------------------

class Game {
  constructor(id, grid2D = [], player = {}, historic = [], recordRate = 500) {
    this.id = id
    this.grid2D = grid2D
    this.chronometer = new Chronometer()
    this.gameInterval = null
    this.frameRate = 100
    this.bullets = []
    this.player = player
    this.player.game = this
    this.historic = historic
    this.ranking = []
    this.recordRate = recordRate
  }

  drawMaze() {
    const xOffset = this.player.position.x - viewColumnNum / 2
    const yOffset = this.player.position.y - viewLineNum / 2
    for (let y = 0; y < viewLineNum + 1; y++) {
      for (let x = 0; x < viewColumnNum + 1; x++) {
        const lineInd = Math.floor(y + yOffset)
        const cellInd = Math.floor(x + xOffset)
        const canvasIndX = x - (this.player.position.x % 1)
        const canvasIndY = y - (this.player.position.y % 1)
        this.drawCell(cellInd, lineInd, canvasIndX, canvasIndY)
      }
    }
    this.player.draw()
    const ind = this.getHistoricInd()
    this.historic.forEach((otherPlayer) => {
      const coord = otherPlayer.playerMove[ind]
      if (coord) {
        if (this.isInView(Number(coord.x), Number(coord.y), this.player.position)) {
          this.drawOtherPlayer(Number(coord.x) - xOffset, Number(coord.y) - yOffset)
        }
        this.checkVictory({ ...otherPlayer, position: coord })
      }
    })
    this.bullets.forEach((bullet) => {
      if (this.isInView(bullet.position.x, bullet.position.y, this.player.position)) {
        bullet.draw(xOffset, yOffset)
      }
    })
  }

  drawCell(cellInd, lineInd, canvasIndX, canvasIndY) {
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
        this.player.drawBIG(Number(coord.x), Number(coord.y), cellWidth, cellheight)
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
    const playerWidth = playerSize * cellWidth
    ctx.fillStyle = colors.playerGost
    ctx.beginPath()
    ctx.arc(x * cellWidth - playerWidth, y * cellheight - playerWidth, playerWidth, 0, 2 * Math.PI)
    ctx.closePath()
    ctx.fill()
  }

  isWall(x, y) {
    if (x < 0 || y < 0 || y >= this.grid2D.length || x >= this.grid2D[0].length) return true

    return this.grid2D[Math.floor(y)][Math.floor(x)] === wallValue
  }

  isPlayer(xBullet, yBullet) {
    const ind = this.getHistoricInd()
    const deadPlayerInd = this.historic.findIndex((otherPlayer) => {
      const coord = otherPlayer.playerMove[ind]
      return (
        xBullet+bulletSize > Number(coord?.x) - playerSize &&
        xBullet-bulletSize < Number(coord?.x) + playerSize &&
        yBullet+bulletSize > Number(coord?.y) - playerSize &&
        yBullet-bulletSize < Number(coord?.y) + playerSize
      )
    })
    if (deadPlayerInd > -1) {
      this.historic.splice(deadPlayerInd, 1)
      return true
    }
    return false
  }

  runGameLoop() {
    this.chronometer.start(clockEl)
    this.player.startLogs(this.recordRate)
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
    const index = Math.floor((this.chronometer.currentTime * 10) / this.recordRate)
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
        this.player.position = { y: y + 0.5, x: x + 0.5 }
      }
    }
  }
  checkVictory(player) {
    const cell = this.grid2D[Math.floor(player.position.y)][Math.floor(player.position.x)]
    const isInVictoryInd = this.ranking.findIndex((el) => el.id === player.id)
    if (isInVictoryInd > -1) {
      if (cell !== endValue) {
        this.ranking.splice(isInVictoryInd, 1)
      }
    } else {
      if (cell === endValue) {
        this.ranking.push({ ...player, time: this.chronometer.currentTime })
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
      const ranking = this.ranking.map((el) => ({ name: el.name, user: el.userID, time: el.time }))
      try {
        await gameAPI.sendGame({ historic, ranking })
      } catch (error) {
        console.log({ error })
      }
    }
  }
}
