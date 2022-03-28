const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const coordinateSchema = new Schema({
  direction: {
    type: String,
    unique: true
  },
  x: {
    type: String,
    unique: true
  },
  y: {
    type: String,
    unique: true
  },
});


module.exports = coordinateSchema;
