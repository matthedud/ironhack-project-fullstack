const router = require("express").Router();
const express = require('express');

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

router.get("/hof", async (req, res, next) => {//Hall of Fame
    try {
        const rankings = await Ranking.find()
        res.render("hof", {rankings})
    } catch (error) {
        console.error(error)
        next(error)
    }
});

router.get("/instructions", (req, res, next) => {
    res.render("instructions")

});

router.get("/game", async (req, res, next) => {
    try {
        const map = await Map.findOne({ current: true })
        const historics = await Historique.find({map: map._id})
        res.render("game", {map, historics})
    } catch (error) {
        console.error(error)
        next(error)
    }
});

router.post("/game", async (req, res, next) => {//END-GAME
    try {
        console.log("ENDGAME")
        // const gameLogs = req.body// Need to figure out how to pass Historique data   
        // await Historique.create(gameLogs)
        res.redirect('/')
    } catch (error) {
        console.error(error)
        next(error)
    }
});

//router.use('/hof', require('./movies.routes.js'))

module.exports = router;
