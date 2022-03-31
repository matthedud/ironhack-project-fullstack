
import mongoose from "mongoose"
import { Router } from "express"
import Historic from "../models/Historic.model.js"
import Map from "../models/Map.model.js"
import User from "../models/User.model.js"
import isLoggedIn from "../middleware/isLoggedIn.js"
import isLoggedOut from "../middleware/isLoggedOut.js"

const router = new Router()

router.get("/userProfile", isLoggedIn, async (req, res) => {
  const numberOfGames = await Historic.find({ user: req.session.user._id }).count()
  const mapPlayedNumber = await Historic.find({ user: req.session.user._id })
    .distinct("map")
    .count()
  console.log({ mapPlayedNumber, numberOfGames })
  res.render("users/user-profile", {
    user: req.session.user,
    mapPlayedNumber,
    numberOfGames,
  })
})

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

export default router
