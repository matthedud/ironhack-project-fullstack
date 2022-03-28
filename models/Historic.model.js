const { Schema, model } = require("mongoose");

const coordinateSchema = require('./Coordinate.model')

const historicSchema = new Schema({
  player:{
    type: Schema.Types.ObjectId,
    ref: 'Player',
    required: true,
  },
  map: {
    type: Schema.Types.ObjectId,
    ref:'Map',
    required: true,
  },
  playerMove: {
    type: [coordinateSchema],
    required: true,
  },
  bulletMove: {
    type: [coordinateSchema],
    required: true,
  },
});

const Historic = model("Historic", historicSchema);

module.exports = Historic;
