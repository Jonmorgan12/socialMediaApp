const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProfileSchema = new Schema(
  {
    // by default MongoDB creates an Id, this Schema will be used as an id based on the userModel
    user: { type: Schema.Types.ObjectId, ref: "User" },
    bio: { type: String, required: true },
    social: {
      facebook: { type: String },
      twitter: { type: String },
      instagram: { type: String },
      youtube: { type: String },
    },
    //   so we can know when the user is created (timestamp: true)
  },
  { timestamp: true }
);

module.exports = mongoose.model("Profile", ProfileSchema);
