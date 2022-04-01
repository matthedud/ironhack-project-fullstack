import { Router } from "express";
import Ranking from "../models/Historic.model.js";
import Map from "../models/Map.model.js";
import Historic from "../models/Historic.model.js";
import isLoggedIn from "../middleware/isLoggedIn.js";

const router = new Router();

router.get("/", (req, res, next) => {
  const user = req.session?.user;
  res.render("index", { user });
});

router.get("/hof", async (req, res, next) => {
  //Hall of Fame
  try {
    const user = req.session?.user;
    const rankings = await Ranking.find();
    res.render("hof", { rankings, user });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.get("/instructions", (req, res, next) => {
  const user = req.session?.user;
  res.render("instructions", { user });
});

router.get("/editor", isLoggedIn, (req, res, next) => {
  const user = req.session?.user;
  res.render("editor-form", { user });
});

router.get("/editor/:width/:height", isLoggedIn, (req, res, next) => {
  const user = req.session?.user;
  const mapSize = {
    width: req.params.width,
    height: req.params.height,
    canvasWidth: (600 * req.params.width) / req.params.height,
  };
  res.render("editor", { mapSize, user });
});

router.post("/editor", isLoggedIn, async (req, res, next) => {
  const user = req.session?.user;
  res.redirect("/editor/" + req.body.width + "/" + req.body.height);
});

router.get("/game", async (req, res, next) => {
  const user = req.session?.user;
  res.render("game", { user });
});

router.get("/game/:id", async (req, res, next) => {
  const user = req.session?.user;
  const id = req.params.id;
  res.render("game", { id, user });
});

router.post("/game", async (req, res, next) => {
  const user = req.session?.user;
  //END-GAME
  try {
    const { playerMove, mapID, playerID } = req.body;
    await Historic.create({ playerMove, map: mapID, player: playerID });
    res.redirect("/", { user });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

export default router;
