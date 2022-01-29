const express = require('express');
const favorites = express.Router();
const Favorites = require('../models/favoritesModel')



///////// INDEX ROUTE  //////////////
favorites.get('/', (req, res) => {
  Favorites.find({}, (error, foundFavorites) => {
    if (error){
      rs.status(400).json({error: error.message})
    } else{
      res.status(200).json(foundFavorites)
    }
  })
})

///////// CREATE/POST ROUTE  //////////////
favorites.post('/', (req, res) => {
  Favorites.create(req.body, (error, createdFavorite) => {
    if(error) {
      res.status(400).json({error: error.message})
    }else{
    res.status(200).json(createdFavorite)
    }
  })
})

///////// DELETE ROUTE  //////////////
favorites.delete('/:id', (req, res) => {
  Favorites.findByIdAndDelete(req.params.id, (error, deletedFavorite)=>{
    if(error){
      res.status(400).json({error: error.message})
    }else if (deletedFavorite === null){
      res.status(404).json({message: 'holiday id is not found'})
    }else{
      res.status(200).json({message: `Holiday ${deletedFavorite.name} DELETED SUCCESSFULLY`})
    }
  })
})

///////// UPDATE ROUTE  //////////////
  favorites.put('/:id', (req,res) => {
  Favorites.findByIdAndUpdate(req.params.id, req.body, {new:true},
  (error, updatedFavorite) => {
    if (error){
      res.status(400).json({error: error.message})
    } else {
      res.status(200).json({
        message: `Holiday ${updatedFavorite.id} updated SUCCESSFULLY`,
        data: updatedFavorite
      })
    }
  })
})

///////// PATCH ROUTE  //////////////
//  increments number of likes //
favorites.patch('/addlikes/:id', (req, res) => {
  Favorites.findByIdAndUpdate(req.params.id, { $inc: {likes: 1}}, {new:true}, (error, updatedFavorite) => {
    if(error) {
      res.status(400).json({error: error.message})
    } else {
      res.status(200).json({data: updatedFavorite})
    }
  })
})




module.exports = favorites;
