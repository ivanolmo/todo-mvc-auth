const express = require('express'); // Import express
const app = express(); // Create express app
const mongoose = require('mongoose'); // Import mongoose
const passport = require('passport'); // Import passport
const session = require('express-session'); // Import express-session
const MongoStore = require('connect-mongo')(session); // Import connect-mongo
const flash = require('express-flash'); // Import express-flash
const logger = require('morgan'); // Import morgan
const connectDB = require('./config/database'); // Import database
const mainRoutes = require('./routes/main'); // Import main routes
const todoRoutes = require('./routes/todos'); // Import todo routes
const tagRoutes = require('./routes/tags'); // Import tag routes

require('dotenv').config({ path: './config/.env' }); // Import dotenv

// Passport config
require('./config/passport')(passport); // Import passport config

connectDB(); // Connect to database

app.set('view engine', 'ejs'); // Set view engine to ejs
app.use(express.static('public')); // Set public folder
app.use(express.urlencoded({ extended: true })); // Set urlencoded
app.use(express.json()); // Set json
app.use(logger('dev')); // Set logger to dev
// Sessions
app.use(
  // Set session
  session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }), // Set store to mongo
  })
);

// Passport middleware
app.use(passport.initialize()); // Initialize passport
app.use(passport.session()); // Set passport session

app.use(flash()); // Set flash

app.use('/', mainRoutes); // Set main routes
app.use('/todos', todoRoutes); // Set todo routes
app.use('/tags', tagRoutes); // Set tag routes

app.listen(process.env.PORT, () => {
  // Listen to port
  console.log('Server is running, you better catch it!'); // Log to console
});
