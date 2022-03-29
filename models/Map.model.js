const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const mapSchema = new Schema({
  cells:{
     type: [[Number]]
  },
  debut:{
    type: Date,
    default: new Date(),
    require: true,
  },
  current:{
    type: Boolean,
    require: true,
    default: true
  }
});

const Map = model("Map", mapSchema);

module.exports = Map;




