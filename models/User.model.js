const { Schema, model } = require("mongoose");
const mapSchema = require('./Map.model')

const userSchema = new Schema({
  username: {
    type: String,
    required: [true, "Username is required."],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Email is required."],
    match: [/^\S+@\S+\.\S+$/, "Please use a valid email address."],
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, "Password is required."],
  },
  maps: {
    type: [Schema.Types.ObjectId],
    ref:'Map',
    required: false,
  }
});

const User = model("User", userSchema);

module.exports = User;
