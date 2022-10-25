const mongoose = require('mongoose')

const Schema = mongoose.Schema

const mealSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  calories: {
    type: Number,
    required: true
  },
  serving: {
    type: Number,
    required: true
  },
  user_id: {
    type: String,
    required: true
  }
}, { timestamps: true })

module.exports = mongoose.model('Meal', mealSchema)