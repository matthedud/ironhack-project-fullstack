
// class to keep track of the state of the keyboard input
class KeyBoard {
  constructor() {
    this.up = false
    this.down = false
    this.right = false
    this.left = false
    this.shoot = false

    //document.addEventListener("keydown", this.keyDownlistener)
    document.addEventListener("keyup",(event) =>{
      if (event.key === "ArrowRight") this.right = false
      if (event.key === "ArrowLeft") this.left = false
      if (event.key === "ArrowUp") this.up = false
      if (event.key === "ArrowDown") this.down = false
    
      if (event.key === "d") this.right = false
      if (event.key === "q") this.left = false
      if (event.key === "z") this.up = false
      if (event.key === "s") this.down = false
    })

    document.addEventListener("keydown",(event) =>{
      if (game?.gameInterval) {
        if (event.key === "ArrowRight") this.right = true
        if (event.key === "ArrowLeft") this.left = true
        if (event.key === "ArrowUp") this.up = true
        if (event.key === "ArrowDown") this.down = true
    
        if (event.key === "d") this.right = true
        if (event.key === "q") this.left = true
        if (event.key === "z") this.up = true
        if (event.key === "s") this.down = true
      }
    })
  }

  resetKeyboard() {
    this.up = false
    this.down = false
    this.right = false
    this.left = false
    this.shoot = false
  }

}

// window.addEventListener("gamepadconnected", showController)
// window.addEventListener("gamepaddisconnected", showController)





