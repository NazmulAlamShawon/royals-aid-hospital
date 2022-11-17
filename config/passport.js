const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

// Load User model
const User = require('../src/models/Users');

module.exports = function(passport) {
    passport.use(
      new LocalStrategy({ usernameField: 'email' }, (username, email, password, done) => {
        
        // Match user
        User.findOne({
          email: email, username:username
        }).then(user => {
          if (!user) {
            return done(null, false, { message: 'That email is not registered' });
          }
         else if (!user) {
            return done(null, false, { message: 'That username is not registered' });
          }
  
          // Match password
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
  
    passport.serializeUser((user, done) => {
      if( user) {
        return done(null,user.id)
      }
      return done(null,false)
    });
  
    passport.deserializeUser((id, done) =>{
      User.findById(id, (err, user) => {
        if (err) return done(null,false);
        return done(null,user)
      });
    });
  };