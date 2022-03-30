const { Schema } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const coordinateSchema = new Schema({
  direction: {
    type: String,
  },
  x: {
    type: String,
  },
  y: {
    type: String,
  },
});

module.exports = coordinateSchema;
