const { Schema, model } = require("mongoose");

const coordonateSchema = require('./Coordonate.model')

const historiqueSchema = new Schema({
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
    type: [coordonateSchema],
  },
  bulletMove: {
    type: [coordonateSchema],
    required: true,
  },
});

const Historique = model("Historique", historiqueSchema);

module.exports = Historique;
