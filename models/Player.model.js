import mongoose from "mongoose"
const Schema = mongoose.Schema
const model = mongoose.model


import coordonateSchema from './Coordinate.model.js'

const playerSchema = new Schema({
  name:{
    type: String,
    required: true,
  } ,
  user: {
    type: Schema.Types.ObjectId,
    ref:'User',
    required: false,
  },
});

const Player = model("Player", playerSchema);

export default Player;
