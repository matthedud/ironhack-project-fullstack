const { Schema, model } = require("mongoose");

const coordonateSchema = require('./Coordonate.model')

const playerSchema = new Schema({
  name:{
    type: String,
    required: true,
  } ,
  user: {
    type: Schema.Types.ObjectId,
    ref:'User',
    required: false,
  },
});

const Player = model("Player", playerSchema);

module.exports = Player;
