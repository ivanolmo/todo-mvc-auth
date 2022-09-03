const express = require('express'); // Import express
const router = express.Router(); // Create router
const tagsController = require('../controllers/tags'); // Import tags controller
const { ensureAuth } = require('../middleware/auth'); // Import auth middleware

router.get('/', ensureAuth, tagsController.getTags); // Set get tags route

router.post('/createTags', tagsController.createTags); // Set create tag route

router.delete('/deleteTag', tagsController.deleteTag); // Set delete tag route

router.put('/updateTag', tagsController.updateTag); // Set update tag route

router.put('/getTag', tagsController.getTag); // Set get tag route

module.exports = router; // Export router
