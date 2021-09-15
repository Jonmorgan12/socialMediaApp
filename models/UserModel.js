const mongoose = require("mongooose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    //   by default whenever you search for a user on the back end, password will not appear in DB(select: false)
    password: { type: String, required: true, select: false },
    //   by default if there is any spaces in user name it will be trimmed(trim: true)
    username: { type: String, required: true, unique: true, trim: true },
    profilePickUrl: { type: String },
    newMessagePopup: { type: Boolean, default: true },
    unreadMessage: { type: Boolean, default: false },
    unreadNotifacation: { type: Boolean, default: false },
    //   enum states that there can only be two values in the array
    role: { type: String, default: "user", enum: ["user", "root"] },
    resetToken: { type: String },
    //   the token we will send to reset the password will only be valid for an hour(type: Date)
    expireToken: { type: Date },
  },
  //   so we can know when the user is created (timestamp: true)
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
