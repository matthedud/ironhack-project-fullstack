import {Game} from "../public/js/modules/Game.class.js"
import {Player} from "../public/js/modules/Player.class.js"
import {Chronometer} from "../public/js/modules/Chronometer.class.js"
import Map from '../models/Map.model.js'
import Historic from '../models/Historic.model.js'

export async function runGame(mapFetch) {
    try{
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
      await Map.findByIdAndUpdate(
        id,
        { ranking },
      )
    } catch (err){
        console.log(err);
    }
}

