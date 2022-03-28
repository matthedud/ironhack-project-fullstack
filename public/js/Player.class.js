const playerSize = 6
let turnSpeed = (10 * Math.PI) / 180
let moveSpeed = 1

class Player {
  constructor(name, position = { x: 0, y: 0, direction: 0 }) {
    this.name = name
    this.position = { x: position.x, y: position.y, direction: position.direction }
    this.controller = null //if the player use controller
	this.lastTimeMove = new Date()

    //---------FOR UX----------
    // this.score = 0
    // this.canShoot = true
    // this.avatar = new Image()
    // this.avatar.src = "./Image/player/topgun.gif"
    // this.shootSound = new Audio('./Audio/GunShotSnglShotEx PE1097508.mp3');
    // this.reloadSound = new Audio('./Audio/GunCockSingle PE1096303.mp3');
    // this.deadSound = new Audio('./Audio/Wilhelm Scream sound effect.mp3')
    //-------------------------
  }
  draw() {
    // draw circle for player
    ctx.fillStyle = this.color
    ctx.beginPath()
    ctx.arc(canvasWidth / 2 - playerSize, canvasHeight / 2 - playerSize, playerSize, 0, 2 * Math.PI)
    ctx.closePath()
    ctx.fill()

    // draw direction for player
    // ctx.beginPath()
    // const xDirection = this.x + Math.cos(this.direction) * playerSize
    // const yDirection = this.y + Math.sin(this.direction) * playerSize
    // ctx.moveTo(this.x + xOffset, this.y)
    // ctx.lineTo(xDirection + xOffset, yDirection)
    // ctx.closePath()
    // ctx.stroke()
  }

  newCoord() {
	const timeLapse = new Date() - this.lastTimeMove
	this.lastTimeMove= new Date()
    let newx = this.position.x
    let newy = this.position.y
    if (this.controller) {
      const gp = navigator.getGamepads()[this.controller?.index]
      newy = timeLapse * moveSpeed * Number(gp.axes[1].toFixed(1))
      newx = timeLapse * moveSpeed * Number(gp.axes[0].toFixed(1))
    } else {
      if (keyboard.up) newy += moveSpeed * timeLapse
      if (keyboard.down) newy -= moveSpeed * timeLapse
      if (keyboard.right) newx += moveSpeed * timeLapse
      if (keyboard.left) newx -= moveSpeed * timeLapse
    }
    this.move(newx, newy)
  }
}
