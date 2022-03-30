const router = require("express").Router()
const isLoggedIn = require("../middleware/isLoggedIn")
const Map = require("../models/Map.model")
const Historic = require("../models/Historic.model")
const User = require("../models/User.model")

const recordRate = 100

router.get("/game", async (req, res, next) => {
  try {
    const map = await Map.findOne({ current: true })
    const user = req.session?.user
    if (map) {
      const historics = await Historic.find({ map: map._id })
      res.send({ map, historics, user })
    } else {
      const newGrid = Map.createMap()
      const newMap = await Map.create({ cells: newGrid, recordRate })
      res.send({map:newMap, historics:[], user})
    }
  } catch (error) {
    console.error(error)
    next(error)
  }
})

router.post("/game", async (req, res, next) => {
  const {historic, ranking} = req.body
  try {
     await Historic.create( historic)
     await Map.findByIdAndUpdate(historic.map, {ranking})
  } catch (error) {
    console.error(error)
    next(error)
  }
})

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
