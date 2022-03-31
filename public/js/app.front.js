import { Game } from "./modules/Game.class.js"
import { Player } from "./modules/Player.class.js"
import { EndTImer } from "./modules/EndTImer.class.js"
import { APIHandler } from "./modules/APIHandler.class.js"
import { KeyBoard } from "./modules/Keyboard.class.js"
import { Chronometer } from "./modules/Chronometer.class.js"

//--------------------------DIMENTIONS-----------
export const canvasHeight = window?.innerHeight ? Math.floor(window?.innerHeight * 0.92) : 500
export const canvasWidth = window?.innerWidth ? Math.floor(window?.innerWidth * 0.85) : 500
export const viewColumnNum = 10
export const viewLineNum = 6
export const cellWidth = Math.floor(canvasWidth / viewColumnNum)
export const cellheight = Math.floor(canvasHeight / viewLineNum)
//---------------------------------------------

const clockEndEl = document.getElementById("clock-end-game")

const parentEl = document.getElementById("game")
const canvas = document.createElement("canvas")
canvas.height = canvasHeight
canvas.width = canvasWidth
const ctx = canvas.getContext("2d")
parentEl.appendChild(canvas)

const parentEl2 = document.getElementById("gameBig")
const canvas2 = document.createElement("canvas")
canvas2.height = canvasHeight
canvas2.width = canvasWidth
const context = canvas2.getContext("2d")
if(parentEl2) parentEl2.appendChild(canvas2)


let game = null
let endTimer = null
const gameAPI = new APIHandler()
let player = null
let keyboard = new KeyBoard()
const clock = new Chronometer(document.getElementById("clock"))

const startButton = document.getElementById("start")
const endButton = document.getElementById("end")
startButton.addEventListener("click", startGame)
endButton.addEventListener("click", endGame)



async function startGame(event) {
  event.preventDefault()
  startButton.disabled = true
  let gameFetch
  if(event.target.value!==''){
    gameFetch = await gameAPI.getGame(event.target.value)
  }else{
    gameFetch = await gameAPI.getGame()
  }
  let player
  console.log('user', gameFetch?.user);
  if (gameFetch?.user?.username) {
    player = new Player({
      playerIND: gameFetch?.historics?.length,
      name: gameFetch.user.username,
      user: gameFetch.user,
    })
  } else {
    const name = window.prompt("Enter Name", "Joe")
    if (name) player = new Player({ playerIND: gameFetch?.historics?.length, name })
    else {
      player = null
      startButton.disabled = false
    }
  }
  if (player) {
    game = new Game(
      gameFetch.map._id,
      gameFetch.map.cells,
      player,
      gameFetch.historics,
      gameFetch.map.recordRate,
      gameFetch.map.historicBullets,
      false,
      gameAPI.sendGame
    )
    game.dimention = {
      cellWidth,
      cellheight,
      viewColumnNum,
      viewLineNum,
      canvasHeight,
      canvasWidth,
    }
    player.game = game
    player.keyboard = keyboard
    const endTime = new Date(gameFetch.map.debut).getTime() + gameFetch.map.gameDuration
    endTimer = new EndTImer(endTime)
    document.addEventListener("click", (event) => {
      console.log('here click');
      const direction = player?.pointToAngle(event.offsetX, event.offsetY)
      player?.shoot(direction)
    })
    endTimer.start(clockEndEl)
    game.chronometer = clock
    game.placePlayer()
    game.runGameLoop(ctx, context)
  }
}

function endGame() {
  if (game?.chronometer?.timeLeft) {
    game.chronometer.timeLeft = 0
  }
}


  document.addEventListener("keyup", (event) => {
    if (event.key === "ArrowRight") keyboard.right = false
    if (event.key === "ArrowLeft") keyboard.left = false
    if (event.key === "ArrowUp") keyboard.up = false
    if (event.key === "ArrowDown") keyboard.down = false

    if (event.key === "d") keyboard.right = false
    if (event.key === "q") keyboard.left = false
    if (event.key === "z") keyboard.up = false
    if (event.key === "s") keyboard.down = false
  })

  document.addEventListener("keydown", (event) => {
    if (game?.gameInterval) {
      if (event.key === "ArrowRight") keyboard.right = true
      if (event.key === "ArrowLeft") keyboard.left = true
      if (event.key === "ArrowUp") keyboard.up = true
      if (event.key === "ArrowDown") keyboard.down = true

      if (event.key === "d") keyboard.right = true
      if (event.key === "q") keyboard.left = true
      if (event.key === "z") keyboard.up = true
      if (event.key === "s") keyboard.down = true
    }
  })