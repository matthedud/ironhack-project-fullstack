const { Schema, model } = require("mongoose");

const coordonateSchema = require('./Coordonate.model')

const PlayerMoveSchema = new Schema({
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
  historique: {
    type: [coordonateSchema],
    required: true,
  },
});

const PlayerMove = model("PlayerMove", PlayerMoveSchema);

module.exports = PlayerMove;
