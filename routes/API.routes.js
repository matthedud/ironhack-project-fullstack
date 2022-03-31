const router = require("express").Router()
const isLoggedIn = require("../middleware/isLoggedIn")
const Map = require("../models/Map.model")
const Historic = require("../models/Historic.model")
const User = require("../models/User.model")

router.get("/game", async (req, res, next) => {
  try {
    const map = await Map.findOne({ current: true, isPublic:true });
    const user = req.session?.user;
    if (map) {
      const timeElapse = new Date() - new Date(map.debut)
      if(timeElapse<map.gameDuration){
        const historics = await Historic.find({ map: map._id })
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
      if(timeElapse<map.gameDuration){
        const historics = await Historic.find({ map: map._id })
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
     await Map.findByIdAndUpdate(historic.map, {ranking, historicBullets})
     res.send('cool')
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

module.exports = router
