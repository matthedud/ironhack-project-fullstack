// class to keep track of the state of the keyboard input
export class KeyBoard {
  constructor() {
    this.up = false
    this.down = false
    this.right = false
    this.left = false
    this.shoot = false
  }

  resetKeyboard() {
    this.up = false
    this.down = false
    this.right = false
    this.left = false
    this.shoot = false
  }
}
