const mongoose = require('mongoose'); // Import mongoose

const TodoSchema = new mongoose.Schema({
  // Create schema
  todo: {
    // Create todo
    type: String, // Set type to string
    required: true, // Set required to true
  },
  completed: {
    // Create completed
    type: Boolean, // Set type to boolean
    required: true, // Set required to true
  },
  userId: {
    // Create userId
    type: String, // Set type to string
    required: true, // Set required to true
  },
});

module.exports = mongoose.model('Todo', TodoSchema); // Export model
