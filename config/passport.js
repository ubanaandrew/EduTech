const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
var passport = require('passport');

const User = require('../models/User');

module.exports = function() {
    passport.use(
        new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
            // Match User
            User.findOne({
                email: email
            }).then(User => {
                if (!User) {
                    return done(null, false, { message: 'Email not registered' });
                }

                // Match Password
                bcrypt.compare(password, user.password, (err, isMatch) => {
                    if (err) throw err;
                    if (isMatch) {
                        return done(null, user);
                    } else {
                        return done(null, false, { message: 'Password incorrect' });
                    }
                });
            });
        })
    );
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, User) {
            done(err, user);
        });
    });
};