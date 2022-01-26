cconst bcrypt = require('bcrypt');
const express = require('express');
const users = express.Router();
const UsersModel = require('../models/usersModel');


// POST ROUTE sign up
users.post('/signup', (req, res) => {

    // hashing and salting the password
    req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))

    UsersModel.create(req.body, (error, createdUser) => {
        if (error) {
            res.status(400).json({ error: error.message })
        }
        else {
            console.log("user has been registered")
            res.status(201).json(createdUser)
        }
    })

});


// USER LOGIN ROUTE (CREATE SESSION ROUTE)
users.post('/login', (req, res) => {

    UsersModel.findOne({ username: req.body.username }, (err, foundUser) => {
        if (err) {
            res.send(err)
        }
        else {
            if (foundUser) {
                if (bcrypt.compareSync(req.body.password, foundUser.password)) {
                    //login user and create session
                    req.session.currentUser = foundUser
                    console.log("user has been logged in")
                    res.status(200).json(foundUser)
                }
                else {
                    res.status(404).json({ error: 'User Not Found' })
                }
            }
            else {
                res.status(400).json({ error: err })
            }
        }
    })
})

users.delete('/logout', (req, res) => {
    req.session.destroy(() => {
        res.status(200).json({ msg: 'users logged out' })
    })
})

module.exports = users;
