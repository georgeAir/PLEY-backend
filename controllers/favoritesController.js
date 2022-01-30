const express = require('express');
const favorites = express.Router();
const Favorites = require('../models/favoritesModel')


favorites.get('/seed', async (req, res) => {
  const newFavorites =
    [
      {
        name: "Reggies Chicago",
        price: "$",
        likes: 30,
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRV1zDgqcR4VW47tqR6AVwQRTiuvdc1wl-xIfOuy8_XzxLIY-ilMO4DBq4LFnno46jXkvk&usqp=CAU",
        Phone: "(312)949-0120",
        display_address: "2105 S State St, Chicago, IL 60616",

      }, {
        name: 'Crystals',
        price: "$",
        likes: 10,
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-3U1zse5bsRfkuJaLkINU7QTWVe2iTxKz9q_z9rWUx-hflG-GbLiZ75LxYoFLqpBDBIY&usqp=CAU",
        Phone: "(708) 862-0489",
        display_address: "1727 Sibley Blvd, Calumet City, IL 60409",
      }, {
        name: 'Buffalo Joes',
        price: "$",
        likes: 20,
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRg_7Wy1PJjsxjS8pIBS9imKxx73V0iaHLtd09rtIewYv_PXxFFEaLLbFb3_nJjV3xCpho&usqp=CAU",
        Phone: "773-764-7300",
        display_address: "1841 W. Howard St., Chicago, IL",
      }
    ]

  try {
    const seedItems = await Favorites.create(newFavorites)
    res.send(seedItems)
  } catch (err) {
    res.send(err.message)
  }
})


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
