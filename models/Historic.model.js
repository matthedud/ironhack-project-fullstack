const { Schema, model } = require("mongoose");

const coordinateSchema = require('./Coordinate.model')

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

module.exports = Historic;
