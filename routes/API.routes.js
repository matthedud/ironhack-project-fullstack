const router = require("express").Router()
const express = require("express")
const Map = require("../models/Map.model")
const Historique = require("../models/Historic.model")

router.get("/game", async (req, res, next) => {
  try {
    const map = await Map.findOne({ current: true })
    if (map) {
      const historics = await Historique.find({ map: map._id })
      res.send({ map, historics })
    } else {
      const newGrid = Map.createMap()
      const newMap = await Map.create({ cells: newGrid })
      console.log({newMap});
      res.send({map:newMap, historics:[]})
    }
  } catch (error) {
    console.error(error)
    next(error)
  }
})

module.exports = router
