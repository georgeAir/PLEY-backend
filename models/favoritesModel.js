const mongoose = require('mongoose')

const {Schema, model} = mongoose


const favoritesSchema = new Schema({
  name: {type: String, required: false},
  price: Number,
  likes: {type: Number, default: 0},
  img: {type: String, required: false},
  Phone: {type: String, required: false},
  display_address: {type: String, required: false},
},{timestamps:true })

/// call 'model()'
// will initialize the collection
// collection name

const Favorites = model('Favorites', favoritesSchema)

module.exports = Favorites
