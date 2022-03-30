const { Schema } = require("mongoose");

const rankingSchema = new Schema({
  name: {
    type: String,
    required: true,
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

module.exports = rankingSchema;
