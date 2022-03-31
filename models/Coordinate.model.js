import mongoose from "mongoose";
const Schema = mongoose.Schema;

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

export default coordinateSchema;
