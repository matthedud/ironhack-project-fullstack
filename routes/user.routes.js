const mongoose = require("mongoose");
const { Router } = require("express");
const router = new Router();
const Historic = require("../models/Historic.model");
const Map = require("../models/Map.model");
const User = require("../models/User.model");
const isLoggedIn = require("../middleware/isLoggedIn");

router.get("/userProfile", isLoggedIn, async (req, res) => {
  const mapPlayed = await Historic.find({ user: req.session.user._id });
  const numOfMapPlayed = mapPlayed.length;

  res.render("users/user-profile", {
    user: req.session.user,
    mapPlayed: numOfMapPlayed,
  });
});

// router.get("/user/:id", async (req, res, next) => {
//   try {
//     const user = await User.findById(req.params.id);
//     const history = await Historic.find({ user: user._id }).populate("map");

//     res.render("users/user-profile", { user, history });
//   } catch (err) {
//     next();
//   }
// });

// sort --> map

module.exports = router;
