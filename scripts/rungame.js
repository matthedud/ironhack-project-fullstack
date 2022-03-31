import mongoose from "mongoose"
import schedule from "node-schedule"
import {Game} from "../public/js/modules/Game.class.js"
import {Player} from "../public/js/modules/Player.class.js"
import {Chronometer} from "../public/js/modules/Chronometer.class.js"
import Map from '../models/Map.model.js'
import Historic from '../models/Historic.model.js'

const MONGO_URI = process.env.MONGODB_URI;

mongoose
  .connect('mongodb+srv://matthedud:FSBN5YY7U4DUv1qh@cluster0.yyotl.mongodb.net/Projec2?retryWrites=true&w=majority')
  .then((x) => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`);
  })
  .catch((err) => {
    console.error("Error connecting to mongo: ", err);
  });


async function runGame() {
    try{
        const mapFetch = await Map.findOne({ current: true, isPublic: true })
        const historics = await Historic.find({ map: mapFetch._id })
        if(mapFetch){
            const player = new Player({ playerIND: "N", name: "Joe" })
            const clock = new Chronometer()
            const game = new Game(
              mapFetch._id,
              mapFetch.cells,
              player,
              historics,
              mapFetch.recordRate,
              mapFetch.historicBullets,
              true,
              getRanking
            )
            game.chronometer = clock
            game.placePlayer()
            game.runGameLoop()
            console.log('game running');
        }
    }
    catch(err){
        console.log({err});
    }
}

async function getRanking(ranking, id){
    try{
      console.log('ranking', ranking);
      await Map.findByIdAndUpdate(
        id,
        { ranking },
        { new: true }
      )
    } catch (err){
        console.log(err);
    }

}

const job = schedule.scheduleJob("* * 1 * *", function () {
    runGame()
  })
  

runGame()