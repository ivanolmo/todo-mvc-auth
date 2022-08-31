const express = require('express'); // Import express
const router = express.Router(); // Create router
const todosController = require('../controllers/todos'); // Import todos controller
const { ensureAuth } = require('../middleware/auth'); // Import auth middleware

router.get('/', ensureAuth, todosController.getTodos); // Set get todos route

router.post('/createTodo', todosController.createTodo); // Set create todo route

router.put('/markComplete', todosController.markComplete); // Set mark complete route

router.put('/markIncomplete', todosController.markIncomplete); // Set mark incomplete route

router.delete('/deleteTodo', todosController.deleteTodo); // Set delete todo route

module.exports = router; // Export router
