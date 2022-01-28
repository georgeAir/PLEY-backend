const mongoose = require('mongoose')

const {Schema, model} = mongoose


const favoritesSchema = new Schema({
  name: {type: String, required: true},
  price: String,
  likes: {type: Number, default: 0},
  img: {type: String, required: true},
  Phone: {type: String, required: true},
  display_address: {type: String, required: true},
},{timestamps:true })

/// call 'model()'
// will initialize the collection
// collection name

const Favorites = model('Favorites', favoritesSchema)

module.exports = Favorites
