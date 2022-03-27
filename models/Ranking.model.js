const { Schema, model } = require("mongoose");

const rankingSchema = new Schema({
  name: {
    type: String,
    unique: true
  },
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
  value:{
    type: String,
    required: true,
  }
});

const Ranking = model("Ranking", rankingSchema);

module.exports = Ranking;
