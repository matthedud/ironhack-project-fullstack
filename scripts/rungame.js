const schedule = require("node-schedule")
require("../public/js/GameClass")
require("../public/js/Player.class")
require("../public/js/Bullet.class")
require("../public/js/Chronometer.class")
require("../public/js/constants")


async function runGame() {
    try{
        const mapFetch = await Map.findOne({ current: true, isPublic: true })
        const historics = await Historic.find({ map: map._id })
        const player = new Player({ playerIND: "N", name: "Joe" })
        game = new Game(
          mapFetch._id,
          mapFetch.cells,
          player,
          historics,
          mapFetch.recordRate,
          mapFetch.historicBullets
        )
        game.placePlayer()
        game.runGameLoop()
        console.log('game running');
    }
    catch(err){
        console.log({err});
    }
}


// const job = schedule.scheduleJob("* * 1 * *", function () {
//     runGame()
//   })
  

runGame()