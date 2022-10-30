const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');

// Load user model
const User = require('../models/User');
const { forwardAuthenticated } = require('../config/auth');

exports.register = (req, res) => {
    console.log("Request: " + JSON.stringify(req.body))
    const { name, email, password, password2 } = req.body;
    let errors = [];

    if (!name || !email || !password || !password2) {
        errors.push({ msg: "Please enter all fields."});
    }

    if (password != password2) {
        errors.push({ msg: 'Password does not match' });
    }

    if (password.length < 3) {
        errors.push({ msg: "Password must be at least 3 characters" });
    }

    if (errors.length > 0) {
        res.send('register error')
    } else {
        User.findOne({ email: email }).then(user => {
            if (user) {
                errors.push({ msg: "Email already exists"});
                res.send('register user exists');
            }
            else {
                const newUser = new User({
                    name,
                    email,
                    password
                });

                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err;
                        newUser.password = hash;
                        newUser
                        .save()
                        .then(user => {
                            res.send('Register Successful');
                        })
                        .catch(err => console.log(err));
                    });
                });
            }
        });
    }
}

exports.login = (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: res.send("Login Successful"),
        failureRedirect: res.send("Error logging in"),
        failureFlash: false
    }) (req, res, next);
}

exports.logout = (req, res) => {
    req.logout();
    res.send('User Logout');
}