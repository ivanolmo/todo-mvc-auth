const express = require('express'); // Import express
const router = express.Router(); // Create router
const authController = require('../controllers/auth'); // Import auth controller
const homeController = require('../controllers/home'); // Import home controller
const { ensureAuth, ensureGuest } = require('../middleware/auth'); // Import auth middleware

router.get('/', homeController.getIndex); // Set index route
router.get('/login', authController.getLogin); // Set login route
router.post('/login', authController.postLogin); // Set post login route
router.get('/logout', authController.logout); // Set logout route
router.get('/signup', authController.getSignup); // Set signup route
router.post('/signup', authController.postSignup); // Set post signup route

module.exports = router; // Export router
