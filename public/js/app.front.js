const settingsButton = document.getElementById("btn-settings")
const controllerButton = document.getElementById("btn-controlers")
const cancelButton = document.getElementById("btn-cl")
// const startButton = document.getElementById("btn-start")
const closeControllerButton = document.getElementById("btn-close")
const controlerSetup = document.getElementById("controler-setup")
const clockEl = document.getElementById("clock")

let pauseGame = true

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
parentEl2.appendChild(canvas2)

let game = null
const gameAPI = new APIHandler('http://localhost:3000/API')
// const gameAPI = new APIHandler(process.env.API_URI)

const colors = {
  floor: "rgb(126, 126, 126)",
  wall: "#013aa6",
  start:'yellow',
  end:'green',
  player:'white'
}

const startButton = document.getElementById("start")
const endButton = document.getElementById("end")
startButton.addEventListener("click", startGame)
endButton.addEventListener("click", endGame)

async function startGame(event) {
  event.preventDefault()
  if(!game){
	  const gameFetch = await gameAPI.getGame()
    console.log({gameFetch});
    let player
    if(gameFetch?.user?.userName){
      player = new Player(gameFetch?.historics?.length, gameFetch.user.userName)
    } else {
      const name = window.prompt("Enter Name", 'Joe')
      player = new Player(gameFetch?.historics?.length, name)
    }
	  game = new Game(gameFetch.map._id, gameFetch.map.cells, player,  gameFetch.historics)
    game.placePlayer()
  }
  game.runGameLoop()
}

function endGame(){
  if(game?.chronometer?.timeLeft){
    game.chronometer.timeLeft = 0
  }
}

function randomColor() {
  return "#" + Math.floor(Math.random() * 16777215).toString(16)
}

// settingsButton.addEventListener("click", showSettings)
// controllerButton.addEventListener("click", showController)
// cancelButton.addEventListener("click", hideSettings)
// closeControllerButton.addEventListener("click", hideController)
// form.addEventListener("submit", startGame)

// function showSettings() {
// 	game?.pauseGame()
// 	controllerButton.disabled = true
// 	form.classList.add("visible")
// }
// function showController() {
// 	if(game){
// 		game?.pauseGame()
// 		controlerSetup.classList.add("visible")
// 		settingsButton.disabled = true
// 		setController()
// 	}
// }
// function hideController() {
// 	settingsButton.disabled = false
// 	controlerSetup.classList.remove("visible")
// 	if (game){
// 		game.chronometer.start(clockEl)
// 		game.runGameLoop()
// 	}
// }
// function hideSettings(e) {
// 	if(e?.preventDefault) e.preventDefault()
// 	controllerButton.disabled = false
// 	form.classList.remove("visible")
// 	if (game){
// 		game.chronometer.start(clockEl)
// 		game.runGameLoop()
// 	}
// }
