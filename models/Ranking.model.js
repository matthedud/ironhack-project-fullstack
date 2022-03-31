import mongoose from "mongoose"
const Schema = mongoose.Schema
const model = mongoose.model


const rankingSchema = new Schema({
  name: {
    type: String,
    required: true,
    default:'Joe'
  },
  user:{
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  time:{
    type: Number,
    required: true,
  }
})
export default rankingSchema;
