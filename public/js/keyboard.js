
// class to keep track of the state of the keyboard input
class KeyBoard {
  constructor(id) {
    this.id = id
    this.up = false
    this.down = false
    this.turnRight = false
    this.turnLeft = false
    this.shoot = false
  }

  resetKeyboard() {
    this.up = false
    this.down = false
    this.turnRight = false
    this.turnLeft = false
    this.shoot = false
  }
}

document.addEventListener("keydown", keyDownlistener)
document.addEventListener("keyup", keyUpListener)


//event listeners to change de state of the keyboard input(2 ways to move: arrows or ZQSD)
function keyDownlistener(event) {
  if (game?.gameInterval) {
    if (event.key === "ArrowRight") keyboards.turnRight = true
    if (event.key === "ArrowLeft") keyboards.turnLeft = true
    if (event.key === "ArrowUp") keyboards.up = true
    if (event.key === "ArrowDown") keyboards.down = true

    if (event.key === "d") keyboards.turnRight = true
    if (event.key === "q") keyboards.turnLeft = true
    if (event.key === "z") keyboards.up = true
    if (event.key === "s") keyboards.down = true
  }

  // this will be use to close setting form
  // if (event.key === "Escape") form.className.includes("visible") ? hideSettings() : showSettings()
}

function keyUpListener(event) {
  if (event.key === "ArrowRight") keyboards.turnRight = false
  if (event.key === "ArrowLeft") keyboards.turnLeft = false
  if (event.key === "ArrowUp") keyboards.up = false
  if (event.key === "ArrowDown") keyboards.down = false

  if (event.key === "d") keyboards.turnRight = false
  if (event.key === "q") keyboards.turnLeft = false
  if (event.key === "z") keyboards.up = false
  if (event.key === "s") keyboards.down = false
}
