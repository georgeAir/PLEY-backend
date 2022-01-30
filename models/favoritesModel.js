const mongoose = require('mongoose')

const {Schema, model} = mongoose


const favoritesSchema = new Schema({
  name: {type: String, required: false},
  price: String,
  likes: {type: Number, default: 1},
  img: {type: String, required: false},
  phone: {type: Number, required: false},
  display_address: {type: String, required: false},
},{timestamps:true })

/// call 'model()'
// will initialize the collection
// collection name

const Favorites = model('Favorites', favoritesSchema)

module.exports = Favorites
