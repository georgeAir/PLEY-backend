require('dotenv').config()
const express = require('express');
const app = express();
const PORT = 3003;
const mongoose = require('mongoose');
const MONGODB_URI = 'mongodb://127.0.0.1:27017/pleyDB'
const cors = require('cors');
const session = require('express-session')
const yelp = require('yelp-fusion')
const apiKey = process.env.REACT_APP_API_KEY
// const apiKey = "ue2_GLAE9FpEp0NX5hhSw_6qzFoN-MlrnL1Sm7BJUnuixUy4u3MnLp_FqUxqpbyMTzqkqLujFbQRfOgFZUP19cxZo5da-uDeU3OnQJ1KhmPZg1LZssAXl494sszyYXYx"
const client = yelp.client(apiKey);

//SETUP CORS middleware
const whitelist = ['http://localhost:3000', 'your heroku application']
const corsOptions = {
    origin: (origin, callback) => {
        if(whitelist.indexOf(origin) !== -1 || !origin){
            callback(null, true)
        }else {
            callback(new Error('Not allowed by CORS'))
        }
    },

    credentials:true
}

app.use(cors(corsOptions))


const SESSION_SECRET = 'asdf'

app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))


//SETUP mongoose
const db = mongoose.connection;
mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
},  ()=> {
    console.log('database connection established')
});

db.on('error', (err) => {console.log('ERROR: ', err) })
db.on('connected', () => {console.log('mongo connected') })
db.on('disconnected', () => {console.log('mongo disconnected') })

const isAuthenticated = (req, res, next) => {
    if(req.session.currentUser){
        next()
    }else {
        res.status(403).json({message: "login is required"})
    }
}

//this will tell server to parse JSON data, and create req.body object.
app.use(express.json())



//controllers
app.use('/restaurant', isAuthenticated, require('./controllers/restaurantsController'));
app.use('/bars', isAuthenticated, require('./controllers/barsController'));
app.use('/users', require('./controllers/usersController'));

app.get('/', (req, res) =>{
  res.send('hello')
})

app.get('/yelp/:term', (req, res) => {
  const searchRequest = {
    term: req.params.term + '+restaurants',
    location: 'chicago'
  }

  client.search(searchRequest)
  .then(response => response.jsonBody.businesses)
  .then(data => res.send(data));
})




app.listen(PORT, ()=> {
    console.log('listening on port andre 3k')
})
