const playerSize = 0.15
let moveSpeed = 0.1

class Player {
  constructor({playerIND, name, user}) {
    this.playerIND = playerIND
    this.user = user?.id
    this.name = name
    this.position = { x: 0, y: 0, direction: 0 }
    this.keyboard = new KeyBoard()
    this.logs = []
    this.logInterval = null
    this.canShoot = true
    this.bullets = 10
    this.color='red'

    document.addEventListener("click", (event) => {
      const direction = this.pointToAngle(event.offsetX, event.offsetY)
      this.shoot(direction)
    })

    this.moveInterval = null
    this.moveRate = 30
    this.reloadTime = 500
    this.game = null

  }

  shoot(direction) {
    if (this.canShoot && this.bullets > 0) {
      const x = this.position.x + Math.cos(direction* Math.PI / 180) * playerSize
      const y =	this.position.y + Math.sin(direction* Math.PI / 180) * playerSize
      const bulletData ={
        playerIND: this.id,
        id: game.nextBulletId,
        position: { x,y, direction },
        time: game.chronometer.currentTime,
      }
      const newBullet = new Bullet(bulletData)
      game.bullets.push(newBullet)
      game.newHistoricBullet.push(bulletData)
      game.nextBulletId++
      this.bullets--
      newBullet.move(game)
      this.canShoot = false
      setTimeout(() => (this.canShoot = true), this.reloadTime)
    }
  }

  draw() {
    // draw circle for player
    const playerWidth = playerSize * cellWidth
    ctx.fillStyle = this.color
    ctx.beginPath()
    ctx.arc(
      canvasWidth / 2 ,
      canvasHeight / 2 ,
      playerWidth,
      0,
      2 * Math.PI
    )
    ctx.closePath()
    ctx.fill()
  }

  newCoord() {
    let newx = this.position.x
    let newy = this.position.y
    let currentSpeed = moveSpeed

    if (this.isMovingDiagonal()) currentSpeed = (currentSpeed / 2) * 1.41

    if (this.controller) {
      const gp = navigator.getGamepads()[this.controller?.index]
      newy = moveSpeed * Number(gp.axes[1].toFixed(1))
      newx = moveSpeed * Number(gp.axes[0].toFixed(1))
    } else {
      if (this.keyboard.up) newy -= currentSpeed
      if (this.keyboard.down) newy += currentSpeed
      if (this.keyboard.right) newx += currentSpeed
      if (this.keyboard.left) newx -= currentSpeed
    }
    return { x: newx, y: newy }
  }

  startMove(game) {
    this.moveInterval = setInterval(() => {
      const { x, y } = this.newCoord()
      if (!game.isWall(x, y)) {
        this.position.x = x
        this.position.y = y
        game.checkVictory(this)
      }
    }, this.moveRate)
  }

  stopMove() {
    clearInterval(this.moveInterval)
    this.moveInterval = null
  }

  isMovingDiagonal() {
    return this.keyboard.up + this.keyboard.down + this.keyboard.right + this.keyboard.left - 1
  }

  pointToAngle(x, y) {
    let deltaX = x - canvasWidth / 2
    let deltaY = canvasHeight / 2 - y
    let result = Math.floor(Math.atan2(deltaY, deltaX) * (180 / Math.PI))
    return result < 0 ? -result : 360 - result
  }

  drawBIG(x, y, cellWidth, cellheight) {
    context.fillStyle = "red"
    context.strokeStyle = "green"
    context.beginPath()
    context.arc(x * cellWidth, y * cellheight, playerSize, 0, 2 * Math.PI)
    context.closePath()
    context.fill()
  }

  log() {
    this.logs.push({ x: this.position.x, y: this.position.y })
  }

  startLogs(recordRate) {
    this.logInterval = setInterval(() => {
      this.log()
    }, recordRate)
  }

  stopLogs() {
    clearInterval(this.logInterval)
  }
}

