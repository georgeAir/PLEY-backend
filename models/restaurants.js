const mongoose = require('mongoose')
const {Schema, model} = mongoose

const restaurantSchema = new Schema ({
  name: {type: String, require: true},
  cuisineType: {type: String, require: true},
  description: {type: String, require: true},
  likes: {type: Number, default: 0},
  location: {type: Number}
})

module.exports = model('Restaurant', restaurantSchema )
