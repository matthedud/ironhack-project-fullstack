
// class to keep track of the state of the keyboard input
class KeyBoard {
  constructor(id) {
    this.id = id
    this.up = false
    this.down = false
    this.turnRight = false
    this.turnLeft = false
    this.shoot = false

    document.addEventListener("keydown", this.keyDownlistener)
    document.addEventListener("keyup", this.keyUpListener)
  }

  resetKeyboard() {
    this.up = false
    this.down = false
    this.turnRight = false
    this.turnLeft = false
    this.shoot = false
  }

  //event listeners to change de state of the keyboard input(2 ways to move: arrows or ZQSD)
  keyDownlistener(event) {
    if (game?.gameInterval) {
      if (event.key === "ArrowRight") this.turnRight = true
      if (event.key === "ArrowLeft") this.turnLeft = true
      if (event.key === "ArrowUp") this.up = true
      if (event.key === "ArrowDown") this.down = true
  
      if (event.key === "d") this.turnRight = true
      if (event.key === "q") this.turnLeft = true
      if (event.key === "z") this.up = true
      if (event.key === "s") this.down = true
    }
  }

  // this will be use to close setting form
  // if (event.key === "Escape") form.className.includes("visible") ? hideSettings() : showSettings()
  keyUpListener(event) {
    if (event.key === "ArrowRight") this.turnRight = false
    if (event.key === "ArrowLeft") this.turnLeft = false
    if (event.key === "ArrowUp") this.up = false
    if (event.key === "ArrowDown") this.down = false
  
    if (event.key === "d") this.turnRight = false
    if (event.key === "q") this.turnLeft = false
    if (event.key === "z") this.up = false
    if (event.key === "s") this.down = false
  }
}

// window.addEventListener("gamepadconnected", showController)
// window.addEventListener("gamepaddisconnected", showController)





