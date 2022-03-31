import mongoose from "mongoose"
import { Router } from "express"
import Historic from "../models/Historic.model.js"
import Map from "../models/Map.model.js"
import User from "../models/User.model.js"
import isLoggedIn from "../middleware/isLoggedIn.js"

const router = new Router()

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

export default router;
