import mongoose from "mongoose"
const Schema = mongoose.Schema

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

export default  coordinateSchema;
