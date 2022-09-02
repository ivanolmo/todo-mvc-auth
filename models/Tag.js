const mongoose = require('mongoose'); // Import mongoose

const TagSchema = new mongoose.Schema({
  // Create schema
  tag: {
    // Create todo
    type: String, // Set type to string
    required: true, // Set required to true
  },
  userId: {
    // Create userId
    type: String, // Set type to string
    required: true, // Set required to true
  },
});

module.exports = mongoose.model('Tag', TagSchema); // Export model