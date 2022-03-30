


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
// parentEl2.appendChild(canvas2)

let game = null

const startButton = document.getElementById("start")
const endButton = document.getElementById("end")
startButton.addEventListener("click", startGame)
endButton.addEventListener("click", endGame)

async function startGame(event) {
  event.preventDefault()
  startButton.disabled = true
  const gameFetch = await gameAPI.getGame()
  let player
  if (gameFetch?.user?.userName) {
    player = new Player(gameFetch?.historics?.length, gameFetch.user.userName)
  } else {
    const name = window.prompt("Enter Name", "Joe")
    if(name) player = new Player(gameFetch?.historics?.length, name)
    else {
      player = null
      startButton.disabled = false
    }
  }
  if(player){
    game = new Game(
      gameFetch.map._id,
      gameFetch.map.cells,
      player,
      gameFetch.historics,
      gameFetch.map.recordRate,
      gameFetch.map.historicBullets,
    )
    game.placePlayer()
    game.runGameLoop()
  }
}

function endGame() {
  if (game?.chronometer?.timeLeft) {
    game.chronometer.timeLeft = 0
  }
}
