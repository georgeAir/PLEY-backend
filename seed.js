const Favorites = require('./models/favoritesModel')

const mongoose = require ('mongoose')

// connect to the DATABASE

/// for heroku
// const mongoURI = 'mongodb+srv://georgeair:Junior0880@cluster0.0c4th.mongodb.net/home?retryWrites=true&w=majority'

///for local
const mongoURI ='mongodb://127.0.0.1:27017/pleyDB'


const db = mongoose.connection

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}, () => {
  console.log('DATABASE connected')
})

Favorites.create(
      {
        name: 'bar',
        price: '100',
        likes: '',
        img: '',
        Phone: '897984379743',
        display_address:'',
      }
    , (err, data)=>{
      if (err){
        console.log(err);
      }else{
    console.log(data);
    db.close()
  }
})



    // to close the DATABASE
// db.close()
