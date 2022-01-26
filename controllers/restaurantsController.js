const express = require('express')
const restaurants = express.Router()
const Restaurant = require('../models/restaurants')



///////// INDEX ROUTE  //////////////
restaurants.get('/', (req, res) => {
  Restaurant.find({}, (error, foundRestaurants) => {
    if (error){
      rs.status(400).json({error: error.message})
    } else{
      res.status(200).json(foundRestaurants)
    }
  })
})

///////// CREATE/POST ROUTE  //////////////
restaurants.post('/', (req, res) => {
  Restaurant.create(req.body, (error, createdRestaurant) =>
  {
    if (error) {
      res.status(400).json({error: error.message})
    }else{
    res.status(200).json(createdRestaurant)
    }
  })
})

///////// DELETE ROUTE  //////////////
restaurants.delete('/:id', (req, res) => {
  Restaurant.findByIdAndDelete(req.params.id, (error, deletedRestaurant)=>{
    if(error){
      res.status(400).json({error: error.message})
    }else if (deletedRestaurant === null){
      res.status(404).json({message: 'holiday id is not found'})
    }else{
      res.status(200).json({message: `Holiday ${deletedRestaurant.name} DELETED SUCCESSFULLY`})
    }
  })
})

///////// UPDATE ROUTE  //////////////
  restaurants.put('/:id', (req,res) => {
  Restaurant.findByIdAndUpdate(req.params.id, req.body, {new:true},
  (error, updatedRestaurant) => {
    if (error){
      res.status(400).json({error: error.message})
    } else {
      res.status(200).json({
        message: `Holiday ${updatedRestaurant.id} updated SUCCESSFULLY`,
        data: updatedRestaurant
      })
    }
  })
})

///////// PATCH ROUTE  //////////////
//  increments number of likes //
restaurants.patch('/addlikes/:id', (req, res) => {
  Restaurant.findByIdAndUpdate(req.params.id, { $inc: {likes: 1}}, {new:true}, (error, updatedRestaurant) => {
    if(error) {
      res.status(400).json({error: error.message})
    } else {
      res.status(200).json({data: updatedRestaurant})
    }
  })
})




module.exports = restaurants
