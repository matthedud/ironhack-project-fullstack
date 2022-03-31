import mongoose from "mongoose"
const Schema = mongoose.Schema
const model = mongoose.model


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
  },
  color: {
    type: String,
    default: 'red'
  }
});

const User = model("User", userSchema);

export default User;
