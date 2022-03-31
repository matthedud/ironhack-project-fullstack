import mongoose from "mongoose"
const Schema = mongoose.Schema
const model = mongoose.model

import coordinateSchema from './Coordinate.model.js'

const historicSchema = new Schema({
  user:{
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: false,
  },
  map: {
    type: Schema.Types.ObjectId,
    ref:'Map',
    required: true,
  },
  playerIND:Number,
  playerName:String,
  playerMove: {
    type: [coordinateSchema],
  },
});

const Historic = model("Historic", historicSchema);

export default  Historic;
