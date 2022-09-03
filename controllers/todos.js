const Todo = require('../models/Todo'); // Import todo model
const Tags = require('./tags.js'); // Import tag controller
const { createTags } = require('./tags');

module.exports = {
  // Export module
  getTodos: async (req, res) => {
    // Create get todos function
    console.log(req.user); // Log to console
    try {
      // Try
      const todoItems = await Todo.find({ userId: req.user.id }).populate('tags'); // Find todo items
      const itemsLeft = await Todo.countDocuments({
        userId: req.user.id,
        completed: false,
      }); // Count items left
      console.log(todoItems)
      res.render('todos.ejs', {
        todos: todoItems,
        left: itemsLeft,
        user: req.user,
      }); // Render todos.ejs
    } catch (err) {
      // Catch
      console.log(err); // Log to console
    }
  },
  createTodo: async (req, res) => {
    // Create create todo function
    try {
      let tags = null
      if (req.body.tags.length) {
        tags = await createTags(req, res)
      }
      const todo = await Todo.create({
        todo: req.body.todoItem,
<<<<<<< HEAD
        subTasks: req.body.subTasks,
=======
        todoDetails: req.body.todoDetails,
>>>>>>> main
        todoDetails: req.body.todoDetails,
        subTasks: req.body.subTasks,        
        completed: false,
        userId: req.user.id,
        tags: tags,
        dueDate: req.body.dueDate,
      }); // Create todo item
      console.log(todo)
      console.log('Todo has been added!'); // Log to console
      res.redirect('/todos'); // Redirect to todos
    } catch (err) {
      // Catch
      console.log(err); // Log to console
    }
  },
  markComplete: async (req, res) => {
    // Create mark complete function
    try {
      // Try
      await Todo.findOneAndUpdate(
        { _id: req.body.todoIdFromJSFile },
        {
          // Find todo item and update
          completed: true, // Set completed to true
        }
      );
      console.log('Marked Complete'); // Log to console
      res.json('Marked Complete'); // Send response
    } catch (err) {
      // Catch
      console.log(err); // Log to console
    }
  },
  markIncomplete: async (req, res) => {
    // Create mark incomplete function
    try {
      // Try
      await Todo.findOneAndUpdate(
        { _id: req.body.todoIdFromJSFile },
        {
          // Find todo item and update
          completed: false, // Set completed to false
        }
      );
      console.log('Marked Incomplete'); // Log to console
      res.json('Marked Incomplete'); // Send response
    } catch (err) {
      // Catch
      console.log(err); // Log to console
    }
  },
  deleteTodo: async (req, res) => {
    // Create delete todo function
    console.log(req.body.todoIdFromJSFile); // Log to console
    try {
      // Try
      await Todo.findOneAndDelete({ _id: req.body.todoIdFromJSFile }); // Find todo item and delete
      console.log('Deleted Todo'); // Log to console
      res.json('Deleted It'); // Send response
    } catch (err) {
      // Catch
      console.log(err); // Log to console
    }
  },
};
