const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FollowerModel = new Schema({
  // by default MongoDB creates an Id, this Schema will be used as an id based on the userModel
  user: { type: Schema.Types.ObjectId, ref: "User" },
  //   an array of followers, each follower is an object within
  followers: [
    {
      user: { type: Schema.Types.ObjectId, ref: "User" },
    },
  ],
  following: [
    {
      user: { type: Schema.Types.ObjectId, ref: "User" },
    },
  ],
});

module.exports = mongoose.model("Follower", FollowerModel);
