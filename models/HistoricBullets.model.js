import mongoose from "mongoose"
const Schema = mongoose.Schema
const model = mongoose.model

import coordinateSchema  from './Coordinate.model.js'

const historicBulletsSchema = new Schema({
  playerIND:{
    type: String,
    required: false,
  },
  time:Number,
  position:coordinateSchema,
});

export default  historicBulletsSchema;
