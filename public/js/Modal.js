const modal = document.getElementById("myModal")
const rankingList = document.getElementById("ranking-list")
// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0]

// When the user clicks on the button, open the modal
function openModal(ranking) {
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

function closeModal() {
  modal.style.display = "none";
  window.location.reload()
}

// When the user clicks on <span> (x), close the modal
span.onclick = closeModal

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    closeModal()
  }
}
