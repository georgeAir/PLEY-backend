const express = require('express')
const bars = express.Router()
const Bar = require('../models/bars')

// GET (index) list of bars
bars.get('/', (req, res) => {
  Bar.find({}, (error, foundBars) => {
    if(error) {
      res.status(400).json({ error: error.message })
    } else {
      res.status(200).json(foundBars)
    }
  })
})

// POST create a bar
bars.post('/', (req, res) => {
  Bar.create(req.body, (error, createdBar) => {
    if(error) {
      res.status(400).json({ error: error.message })
    } else {
      res.status(200).json(createdBar)
    }
  })
})

// DELETE delete a bar
bars.delete('/:id', (req, res) => {
  Bar.findByIdAndDelete(req.params.id, (error, deletedBar) => {
    if(error) {
      res.status(400).json({ error: error.message })
    } else if (deletedBar === null) {
      res.status(404).json({ message: 'Bar id not Found'})
    } else {
      res.status(200).json({ message: `Bar ${deletedBar.name} deleted successfully`})
    }
  })
})

// UPDATE update a bar
bars.put('/:id', (req, res) => {
  Bar.findByIdAndUpdate(req.params.id, req.body, {new:true}, (error, updatedBar) => {
    if (error) {
      res.status(400).json( {error: error.message })
    } else {
      res.status(200).json({
        message: `Bar ${updatedBar.id} updated successfully`,
        data: updatedBar
      })
    }
  })
})

// PATCH -- increments number of likes
bars.patch('/addlikes/:id', (req, res) => {
  Bar.findByIdAndUpdate(req.params.id, { $inc: {likes: 1}}, {new:true}, (error, updatedBar) => {
    if(error) {
      res.status(400).json({error: error.message})
    } else {
      res.status(200).json({data: updatedBar})
    }
  })
})

module.exports = bars
