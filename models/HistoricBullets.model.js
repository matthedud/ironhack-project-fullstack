const { Schema, model } = require("mongoose");

const coordinateSchema = require('./Coordinate.model')

const historicBulletsSchema = new Schema({
  playerIND:{
    type: String,
    required: false,
  },
  time:Number,
  position:coordinateSchema,
});

module.exports = historicBulletsSchema;
