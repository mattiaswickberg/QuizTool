const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const quizRoutes = require('./routes/quizRoutes')
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
require('dotenv').config();
require('./config/passport-config')(passport);


const app = express()
const port = process.env.PORT || 3000

// Middleware
app.use(session({
  secret: process.env.secret,
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(helmet())
app.use(express.json())

// Configure CORS
app.use(cors({
  origin: 'http://localhost:5173', // this is the origin of your front-end app
  credentials: true,
}));

app.use('/quiz', quizRoutes)

// Use local strategy for authentication
passport.use(new LocalStrategy(
  function(username, password, done) {
    // We will fill this part later
  }
));

// Serializing and deserializing user instances to and from the session
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  // We will fill this part later
});


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
})
