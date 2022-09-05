const Todo = require('../models/Todo'); // Import todo model
const { createTags } = require('./tags'); // Import tags controller

module.exports = {
  // Export module
  getTodos: async (req, res) => {
    // Create get todos function
    try {
      // Try
      const todoItems = await Todo.find({ userId: req.user.id }).populate('tags'); // Find todo items
      const itemsLeft = await Todo.countDocuments({
        userId: req.user.id,
        completed: false,
      }); // Count items left
      res.render('todos.ejs', {
        todos: todoItems,
        left: itemsLeft,
        user: req.user,
      }); // Render todos.ejs
    } catch (err) {
      // Catch
      console.error(err); // Log to console
    }
  },
  createTodo: async (req, res) => {
    // Create create todo function
    try {
      let tags
      if (req.body.tags.length) {
        tags = await createTags(req, res)
      } else {
        tags = []
      }
      const todo = await Todo.create({
        todo: req.body.todoItem,
        todoDetails: req.body.todoDetails,
        subTasks: req.body.subTasks,
        completed: false,
        userId: req.user.id,
        tags: tags,
        dueDate: req.body.dueDate,
      }); // Create todo item
      res.redirect('/todos'); // Redirect to todos
    } catch (err) {
      // Catch
      console.error(err); // Log to console
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
      res.json('Marked Complete'); // Send response
    } catch (err) {
      // Catch
      console.error(err); // Log to console
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
      res.json('Marked Incomplete'); // Send response
    } catch (err) {
      // Catch
      console.error(err); // Log to console
    }
  },
  deleteTodo: async (req, res) => {
    // Create delete todo function
    console.log(req.body.todoIdFromJSFile); // Log to console
    try {
      // Try
      await Todo.findOneAndDelete({ _id: req.body.todoIdFromJSFile }); // Find todo item and delete
      res.json('Deleted It'); // Send response
    } catch (err) {
      // Catch
      console.error(err); // Log to console
    }
  },
  findTodos: async (req, res) => {
    try {
      const foundTodos = await Todo.find(req.filters)
      const todoData = await foundTodos.json();
      console.log(foundTodos)
      console.log(todoData)
      res.json(JSON.stringify(todoData))
    } catch (err) {
      console.error(err)
    }
  },

  //   editTodo: async (req, res) => {
  //     await Todo.findOne({ _id: req.body.todoIdFromJSFile });
  //     render('edit.ejs');
  //   },
  // };
  // @desc    Show edit page
  // @route   GET /stories/edit/:id
  editTodo: async (req, res) => {
    try {
      // console.log(req);
      const todo = await Todo.findOne({
        _id: req.params.id,
      }).lean().populate('tags');

      if (!todo) {
        return res.status(404).json('no todo found');
      }

      // if (story.user != req.user.id) {
      //   res.redirect('/stories')
      // } else {
      // console.log(todo);
      res.render('edit', {
        todo,
      });
    } catch (err) {
      console.error(err);
      return res.status(404);
    }
  },

  // @desc    Update story
  // @route   PUT /stories/:id
  updateTodo: async (req, res) => {
    try {
      let todo = await Todo.findById(req.params.id).lean();
      if (!todo) {
        return res.status(404);
      }
      todo = await Todo.findOneAndUpdate(
        { _id: req.params.id },
        {
          todo: req.body.todo,
          todoDetails: req.body.todoDetails,
          dueDate: req.body.dueDate
        },
        {
          returnOriginal: false,
        }
      );
      res.redirect('/todos');
    } catch (err) {
      console.error(err);
      return res.status(500);
    }
  },
  addTags: async (req, res) => {
    try {
      const todo = await Todo.findById(req.body.todoId).lean();
      if (!todo) {
        return res.status(404)
      }
      const tags = todo.tags
      req.body.tags.forEach((el) => {
        if (!tags.includes(el)) {
          tags.push(el)
        }
      })
      const result = await Todo.findOneAndUpdate(
        { _id: req.body.todoId },
        {
          tags: tags
        },
        {
          returnOriginal: false
        }
      )
      res.json(JSON.stringify({tagIds: result.tags}))
    } catch (err) {
      console.error(err)
      return res.status(500)
    }
  },
  // @desc  Removes a tag from a specific todo
  // @route /todos/removeTag
  removeTag: async (req, res) => {
    try {
      await Todo.findOneAndUpdate(
        { _id: req.body.todoId },
        { $pullAll: {
          tags: [req.body.tagId]
        }}
      )
      res.json(true)
    } catch (err) {
      console.error(err)
      return res.status(500)
    }
  },
  // @desc  Deletes a tag from all todos
  // @route /todos/deleteTag
  deleteTag: async (req, res) => {
    try {
      const taggedTodos = await Todo.find({tags: req.body.tagId})
      if (taggedTodos) {
        taggedTodos.forEach(async (el) => {
          await Todo.findOneAndUpdate(
            { _id: el._id },
            { $pullAll: {
              tags: [req.body.tagId]
            }}
          )
          //console.log(`Delete Tag ${req.body.tagId} from todo id ${el._id}`)
        })
      }
      res.json({success: true})
    } catch (err) {
      console.error(err)
      return res.status(500)
    }
  }
};
