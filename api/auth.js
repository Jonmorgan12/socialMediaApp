// creating our routes
const express = require("express");
const router = express.Router();
const UserModel = require("../models/UserModel");
const FollowerModel = require("../models/FollowerModel");

const jwt = require("jasonwebtoken");
const bcrypt = require("bcryptjs");
const isEmail = require("validator/lib/isEmail");
const regexUserName = /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/;

// post method to create a new user
router.post("/", async (req, res) => {
  const { email, password } = req.body.user;

  // if the email is valid
  if (!isEmail(email)) {
    return res.status(401).send("Invalid Email");
  }

  // if the password is greater than 6 characters
  if (password.length > 6) {
    return res.status(401).send("Password must be at least 6 characters");
  }

  try {
    // if there is no other user with this email
    const user = await UserModel.findOne({
      email: email.toLocaleLowerCase(),
    }).select("+password");

    // if no user is found, no database is there
    if (!user) {
      return res.status(401).send("Invalid Credentials");
    }

    // comparing the password on the front end with the backend
    const isPassword = await becrypt.compare(password, user.password);

    if (!password) {
      return res.status(401).send("Invalid Credentials");
    }

    const payload = { userId: user._id };
    jwt.sign(
      payload,
      process.env.jwtSecret,
      { expiresIn: "2d" },
      (error, token) => {
        if (error) {
          throw error;
        }

        res.status(200).json(token);
      }
    );
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server error");
  }
});

module.exports = router;
