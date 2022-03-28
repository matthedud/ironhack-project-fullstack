const { Schema, model } = require("mongoose");

const coordonateSchema = require('./Coordonate.model')

const historiqueSchema = new Schema({
  player:{
    type: Schema.Types.ObjectId,
    ref: 'Player'
  },
  playerMove: {
    type: [coordonateSchema],
  },
  bulletMove: {
    type: [coordonateSchema],
  },
});

const Historique = model("Historique", historiqueSchema);

module.exports = Historique;
