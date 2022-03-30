const floorValue = 1
const endValue = 11
const startValue = 10
const wallValue = 0

const colors = {
    floor: "rgb(126, 126, 126)",
    wall: "#013aa6",
    bullet: 'black',
    start: "yellow",
    end: "green",
    playerGost: "white",
}

const gameAPI = new APIHandler("http://localhost:3000/API")