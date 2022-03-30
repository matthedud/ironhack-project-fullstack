const floorValue = 1
const endValue = 11
const startValue = 10
const wallValue = 0

const bulletVelocity = 0.1
const bulletSize = 1

const gameLength = 100*60 //1 minute


const colors = {
    floor: "rgb(126, 126, 126)",
    wall: "#202020ee",
    bullet: 'black',
    start: "yellow",
    end: "green",
    playerGost: "white",
}

const gameAPI = new APIHandler()