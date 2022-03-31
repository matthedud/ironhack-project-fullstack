import {Router} from "express"
import isLoggedIn from "../middleware/isLoggedIn.js"
import Map from "../models/Map.model.js"
import Historic from "../models/Historic.model.js"
import User from "../models/User.model.js"
import {runGame} from "../scripts/rungame.js"
import schedule from "node-schedule"

const router = new Router();

router.get("/game", async (req, res, next) => {
  try {
    const map = await Map.findOne({ current: true, isPublic: true })
    const user = req.session?.user
    if (map) {
      const timeElapse = new Date() - new Date(map.debut)
      if(timeElapse<map.gameDuration){
        const historics = await Historic.find({ map: map._id }).populate('user')
        res.send({ map, historics, user })
        return
      }
      else{
        map.current = false
        await map.save()
      }
    }
    const newGrid = await Map.createMap()
    const newMap = await Map.create({ cells: newGrid})
    const checkDate = new Date()
    checkDate.setSeconds(new Date(newMap.debut) + newMap.gameDuration/1000 + 120)
    schedule.scheduleJob(checkDate, async function () {
        try{
           runGame(newMap) }
        catch (err){ console.log(err); }
    })
    res.send({map:newMap, historics:[], user})
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.get("/game/:id", async (req, res, next) => {
  try {
    const map = await Map.findById(req.params.id)
    const user = req.session?.user;
    if (map) {
      const timeElapse = new Date() - new Date(map.debut)
      if (timeElapse < map.gameDuration) {
        const historics = await Historic.find({ map: map._id })
        res.send({ map, historics, user })
        return
      } else {
        map.current = false
        await map.save()
      }
    }
      const newGrid = await Map.createMap()
    const newMap = await Map.create({ cells: newGrid})
    res.send({map:newMap, historics:[], user})
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.post("/game", async (req, res, next) => {
  const {historic, ranking, historicBullets} = req.body
  try {
     await Historic.create( historic)
     const savedMap = await Map.findByIdAndUpdate(historic.map, {ranking, historicBullets}, {new:true})
     res.send(savedMap.ranking)
  } catch (error) {
    console.error(error);
    next(error);
  }
});   
  
router.post("/game/:id", async (req, res, next) => {
  const {historic, ranking, historicBullets} = req.body
  try {
      await Historic.create( historic)
      await Map.findByIdAndUpdate(historic.map, {ranking, historicBullets})
      res.send('cool')
  } catch (error) {
    console.error(error);
    next(error);
  }
}); 

router.post("/map", isLoggedIn, async (req, res, next) => {
  const {mapToSend} = req.body
  try {
    const newMap = await Map.create(mapToSend)
    await User.findByIdAndUpdate(req.session.user._id,{$push: {"maps": newMap._id}})
    res.send('/'+newMap._id)
  } catch (error) {
    console.error(error)
    next(error)
  }
})

router.post("/game", async (req, res, next) => {
  const { historic, ranking, historicBullets } = req.body
  try {
    // await Historic.create(historic)
    const savedMap = await Map.findByIdAndUpdate(
      historic.map,
      { ranking, historicBullets },
      { new: true }
    )
    res.send(savedMap.ranking)
  } catch (error) {
    console.error(error)
    next(error)
  }
})

router.post("/map", isLoggedIn, async (req, res, next) => {
  const { mapToSend } = req.body
  try {
    const newMap = await Map.create(mapToSend)
    await User.findByIdAndUpdate(req.session.user._id, { $push: { maps: newMap._id } })
    res.send("/" + newMap._id)
  } catch (error) {
    console.error(error)
    next(error)
  }
})

export default router;
