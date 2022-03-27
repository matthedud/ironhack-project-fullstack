const { Schema, model } = require("mongoose");

const coordonateSchema = require('./Coordonate.model')

const PlayerMoveSchema = new Schema({
  player:{
    type: Schema.Types.ObjectId,
    ref: 'Player'
  },
  historique: {
    type: [coordonateSchema],
  },
});

const PlayerMove = model("PlayerMove", PlayerMoveSchema);

module.exports = PlayerMove;
