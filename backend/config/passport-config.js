const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const User = require('../models/userModel');

module.exports = function(passport) {
  passport.use(
    new LocalStrategy(async (username, password, done) => {
      try {
        // Match user
        const user = await User.findByUsername(username);
        if (!user) {
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
      } catch (err) {
        return done(err);
      }
    })
  );

  passport.serializeUser((user, done) => {
    done(null, user.username);
  });

  passport.deserializeUser(async (username, done) => {
    try {
      const user = await User.findByUsername(username);
      done(null, user);
    } catch (err) {
      done(err, null);
    }
  });
};
