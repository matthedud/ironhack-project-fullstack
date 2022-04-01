import { startGame, player } from "./app.front.js"

const modal = document.getElementById("myModal")
const nameModal = document.getElementById("nameModal")
const nameInput = document.getElementById("name-input")

const rankingList = document.getElementById("ranking-list")
// Get the <span> element that closes the modal
const span = document.getElementById("close-modal")
const spanGame = document.getElementById("close-name-modal")

// When the user clicks on the button, open the modal
export function openModal(ranking) {
  modal.style.display = "block"
  rankingList.innerHTML = ""
  if (ranking.length > 0) {
    ranking.forEach((winner) => {
      const listEl = document.createElement("li")
      listEl.innerText = winner.name
      rankingList.appendChild(listEl)
    })
  } else {
    const textEl = document.createElement("p")
    textEl.innerText = "No Winners"
    rankingList.appendChild(textEl)
  }
}

export function openGameModal() {
  nameModal.style.display = "block"
}

export function closeGameModal() {
  nameModal.style.display = "none";
  if(nameInput.value){
    player.name = nameInput.value
    startGame()
  }
  else {
    player = null
    startButton.disabled = false
  }
}


export function closeModal() {
  modal.style.display = "none";
  window.location.reload()
}

// When the user clicks on <span> (x), close the modal
span.onclick = closeModal

spanGame.onclick = () => nameModal.style.display = "none"


// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    closeModal()
  }
}
