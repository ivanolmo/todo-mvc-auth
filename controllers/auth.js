const passport = require('passport');
const validator = require('validator');
const User = require('../models/User');

exports.getLogin = (req, res) => {
  // Get login page
  if (req.user) {
    // If user is logged in
    return res.redirect('/todos'); // Redirect to todos page
  }
  res.render('login', {
    // Render login page
    title: 'Login', // Set page title
  });
};

exports.postLogin = (req, res, next) => {
  // Post login
  const validationErrors = []; // Create validation errors array
  if (!validator.isEmail(req.body.email))
    validationErrors.push({ msg: 'Please enter a valid email address.' }); // If email is not valid, push error to array
  if (validator.isEmpty(req.body.password))
    validationErrors.push({ msg: 'Password cannot be blank.' }); // If password is empty, push error to array

  if (validationErrors.length) {
    // If validation errors array has errors
    req.flash('errors', validationErrors); // Flash errors
    return res.redirect('/login'); // Redirect to login page
  }
  req.body.email = validator.normalizeEmail(req.body.email, {
    gmail_remove_dots: false,
  }); // Normalize email

  passport.authenticate('local', (err, user, info) => {
    // Authenticate user
    if (err) {
      return next(err);
    } // If error, return next with error
    if (!user) {
      // If user does not exist
      req.flash('errors', info); // Flash errors
      return res.redirect('/login'); // Redirect to login page
    }
    req.logIn(user, (err) => {
      // Log in user
      if (err) {
        return next(err);
      } // If error, return next with error
      req.flash('success', { msg: 'Success! You are logged in.' }); // Flash success message
      res.redirect(req.session.returnTo || '/todos'); // Redirect to todos page
    });
  })(req, res, next); // Call passport authenticate function
};

exports.logout = (req, res) => {
  // Logout user
  req.logout(() => {
    // Logout user
    console.log('User has logged out.'); // Log to console
  });
  req.session.destroy((err) => {
    // Destroy session
    if (err)
      console.log('Error : Failed to destroy the session during logout.', err); // Log to console
    req.user = null; // Set user to null
    res.redirect('/'); // Redirect to home page
  });
};

exports.getSignup = (req, res) => {
  // Get signup page
  if (req.user) {
    // If user is logged in
    return res.redirect('/todos'); // Redirect to todos page
  }
  res.render('signup', {
    // Render signup page
    title: 'Create Account', // Set page title
  });
};

exports.postSignup = (req, res, next) => {
  // Post signup
  const validationErrors = []; // Create validation errors array
  if (!validator.isEmail(req.body.email))
    validationErrors.push({ msg: 'Please enter a valid email address.' }); // If email is not valid, push error to array
  if (!validator.isLength(req.body.password, { min: 8 }))
    validationErrors.push({
      msg: 'Password must be at least 8 characters long',
    }); // If password is less than 8 characters, push error to array
  if (req.body.password !== req.body.confirmPassword)
    validationErrors.push({ msg: 'Passwords do not match' }); // If passwords do not match, push error to array

  if (validationErrors.length) {
    // If validation errors array has errors
    req.flash('errors', validationErrors); // Flash errors
    return res.redirect('../signup'); // Redirect to signup page
  }
  req.body.email = validator.normalizeEmail(req.body.email, {
    gmail_remove_dots: false,
  }); // Normalize email

  const user = new User({
    // Create new user
    userName: req.body.userName, // Set userName
    email: req.body.email, // Set email
    password: req.body.password, // Set password
  });

  User.findOne(
    {
      $or: [
        // Find user
        { email: req.body.email }, // Find user by email
        { userName: req.body.userName }, // Find user by userName
      ],
    },
    (err, existingUser) => {
      // Callback function
      if (err) {
        return next(err);
      } // If error, return next with error
      if (existingUser) {
        // If user exists
        req.flash('errors', {
          msg: 'Account with that email address or username already exists.',
        }); // Flash error
        return res.redirect('../signup'); // Redirect to signup page
      }
      user.save((err) => {
        // Save user
        if (err) {
          return next(err);
        } // If error, return next with error
        req.logIn(user, (err) => {
          // Log in user
          if (err) {
            // If error, return next with error
            return next(err); // Return next with error
          }
          res.redirect('/todos'); // Redirect to todos page
        });
      });
    }
  );
};
