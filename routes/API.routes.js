const router = require("express").Router()
const Map = require("../models/Map.model")
const Historic = require("../models/Historic.model")

router.get("/game", async (req, res, next) => {
  try {
    const map = await Map.findOne({ current: true })
    if (map) {
      const historics = await Historic.find({ map: map._id })
      res.send({ map, historics })
    } else {
      const newGrid = Map.createMap()
      const newMap = await Map.create({ cells: newGrid })
      res.send({map:newMap, historics:[]})
    }
  } catch (error) {
    console.error(error)
    next(error)
  }
})

router.post("/game", async (req, res, next) => {
  const {historic} = req.body
  try {
     await Historic.create( historic)
     res.redirect("/")
  } catch (error) {
    console.error(error)
    next(error)
  }
})

module.exports = router
