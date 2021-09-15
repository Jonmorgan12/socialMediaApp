// creating our routes
const express = require("express");
const router = express.Router();
const UserModel = require("../models/UserModel");
const ProfileModel = require("../models/ProfileModel");
const FollowerModel = require("../models/FollowerModel");

const jwt = require("jasonwebtoken");
const bcrypt = require("bcryptjs");
const isEmail = require("validator/lib/isEmail");
const userPng =
  "https://res.cloudinary.com/indersingh/image/upload/v1593464618/App/user_mklcpl.png";

const regexUserName = /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/;

// get request when creating a new user
router.get("/:username", async (req, res) => {
  const { username } = req.params;

  try {
    //   checking if the username has a length greater than one
    if (username.length < 1) {
      return res.status(401).send("Invalid");
    }

    // checking if it passes the regex test
    if (!regexUserName.test(username)) {
      return res.status(401).send("Invalid");
    }

    // finding a user with its username property
    const user = await UserModel.findOne({
      username: username.toLocaleLowerCase(),
    });

    // if user is found with the same username
    if (user) {
      return res.status(401).send("Username is already Taken");
    }

    return res.status(200).send("Available");
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server error");
  }
});

// post method to create a new user
router.post("/", async (req, res) => {
  const {
    name,
    email,
    username,
    password,
    bio,
    facebook,
    youtube,
    twitter,
    instagram,
  } = req.body.user;

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
    let user;
    user = await UserModel.findOne({ email: email.toLocaleLowerCase() });

    // if user is found
    if (user) {
      return res.status(401).send("User already registered");
    }

    user = new UserModel({
      name,
      email: email.toLocaleLowerCase(),
      username: username.toLocaleLowerCase(),
      password,
      //   default pic will load if user did not use a pic
      ProfilePicUrl: req.body.ProfilePicUrl || userPng,
    });

    //hashing our password
    user.password = await bcrypt.hash(password, 10);
    await user.save();

    let profilefields = {};
    profilefields.user.user_id;
    profilefields.bio = bio;
    profilefields.social = {};

    if (facebook) {
      profilefields.social.facebook = facebook;
    }

    if (youtube) {
      profilefields.social.youtube = youtube;
    }

    if (instagram) {
      profilefields.social.instagram = instagram;
    }

    if (twitter) {
      profilefields.social.twitter = twitter;
    }

    // after these two models are created we will send a token back to the front end
    await new ProfileModel(profilefields).save();
    await new FollowerModel({
      user: user._id,
      followers: [],
      following: [],
    }).save();

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
