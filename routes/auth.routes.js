const mongoose = require("mongoose");
const { Router } = require("express");
const router = new Router();
const userModel = require("../models/User.model");

const bcryptjs = require("bcryptjs");
const saltRounds = 10;

//////// SIGN UP /////////
router.post("/signup", async (req, res, next) => {
  try {
    const { username, email, password } = await req.body;

    // make sure users fill all mandatory fields:
    if (!username || !email || !password) {
      res.render("auth/signup", {
        errorMessage:
          "All fields are mandatory. Please provide your username, email and password.",
      });
      return;
    } else {
      const userNameExist = await userModel.findOne({ username });
      if (userNameExist === true) {
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
router.post("/login", (req, res, next) => {
  const { email, password } = req.body;

  if (email === "" || password === "") {
    res.render("auth/login", {
      errorMessage: "Please enter both, email and password to login.",
    });
    return;
  }

  User.findOne({ email }) // <== check if there's user with the provided email
    .then((user) => {
      // <== "user" here is just a placeholder and represents the response from the DB
      if (!user) {
        // <== if there's no user with provided email, notify the user who is trying to login
        res.render("auth/login", {
          errorMessage: "Email is not registered. Try with other email.",
        });
        return;
      }

      // if there's a user, compare provided password
      // with the hashed password saved in the database
      else if (bcryptjs.compareSync(password, user.passwordHash)) {
        // if the two passwords match, render the user-profile.hbs and
        //                   pass the user object to this view
        //                                 |
        //                                 V
        res.render("users/user-profile", { user });
      } else {
        // if the two passwords DON'T match, render the login form again
        // and send the error message to the user
        res.render("auth/login", { errorMessage: "Incorrect password." });
      }
    })
    .catch((error) => next(error));
});

// router.post("/login", (req, res, next) => {
//   const { email, username, password } = req.body;

//   bcryptjs
//     .genSalt(saltRounds)
//     .then((salt) => bcryptjs.hash(password, salt))
//     .then((hashedPassword) => {
//       console.log(`Password hash: ${hashedPassword}`);
//     })
//     .catch((error) => next(error));
// });

module.exports = router;
