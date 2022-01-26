const mongoose = require('mongoose')
const { Schema, model } = mongoose

const barSchema = new Schema({
  name: {type: String, require: true},
  visited: {type: Boolean, default: false},
  description: {type: String, default: 'Best Bar ever!!'},
  likes: {type: Number, default: 0},
  location: [{type: Number}]
})

module.exports = model('BAR', barSchema)
