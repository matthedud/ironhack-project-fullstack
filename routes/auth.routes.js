const mongoose = require("mongoose");
const { Router } = require("express");
const router = new Router();
const userModel = require("../models/User.model");

const bcryptjs = require("bcryptjs");
const saltRounds = 10;

//////// SIGN UP /////////
router.get("/signup", (req, res) => res.render("auth/signup"));

router.post("/signup", async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    bcryptjs
      .genSalt(saltRounds)
      .then((salt) => bcryptjs.hash(password, salt))
      .then((hashedPassword) => {
        console.log(`Password hash: ${hashedPassword}`);
      });

    // make sure users fill all mandatory fields:
    if (!username || !email || !password) {
      res.render("auth/signup", {
        errorMessage:
          "All fields are mandatory. Please provide your username, email and password.",
      });
      return;
    } else {
      const userNameExist = await userModel.findOne({ username });
      if (userNameExist) {
        res.render("auth/signup", {
          errorMessage: "Oups this name is already taken :(",
        });
      }
    }
  } catch {
    if (error instanceof mongoose.Error.ValidationError) {
      res.status(500).render("auth/signup", { errorMessage: error.message });
    } else {
      next(error);
    }
  }
});

//////// LOG IN /////////

// GET route ==> to display the login form to users
router.get("/login", (req, res) => res.render("auth/login"));

// POST login route ==> to process form data
router.post("/login", async (req, res, next) => {
  try {
    const { username, password } = req.body;

    bcryptjs
      .genSalt(saltRounds)
      .then((salt) => bcryptjs.hash(password, salt))
      .then((hashedPassword) => {
        console.log(`Password hash: ${hashedPassword}`);
      });

    if (!username || !password) {
      res.render("auth/login", {
        errorMessage: "Please enter both, username and password to login.",
      });
      return;
    } else {
      const userNameExist = await userModel.findOne({ username });
      if (userNameExist) {
        res.render("auth/login", {
          errorMessage: "Oups this name is already taken :(",
        });
      }
    }
  } catch {
    next(error);
  }
});

module.exports = router;
