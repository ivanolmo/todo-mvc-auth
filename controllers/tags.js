const Tag = require('../models/Tag'); // Import tag model

module.exports = {
  // Export module
  getTags: async (req, res) => {
    // Create get tags function
    console.log(req.user); // Log to console
    try {
      // Try
      const tags = await Tag.find({ userId: req.user.id }); // Find tags
      res.render('tags.ejs', {
        tags: tags,
        user: req.user,
      }); // Render tags.ejs
    } catch (err) {
      // Catch
      console.log(err); // Log to console
    }
  },
  createTags: async (req, res) => {
    // Create create tags function
    let tags = req.body.tags.split(',').map(e => ({
      updateOne: {
        filter: {tag: e.toLowerCase().trim()},
        update: {
          tag: e.toLowerCase().trim(),
          userId: req.user.id
        },
        upsert: true
      }
    }))
    try {
      const tagResult = await Tag.bulkWrite(tags); // Create tags
      console.log('Tags have been added!'); // Log to console
      if ( !req.body.todoItem ) {
        res.redirect('/tags'); // Redirect to tags
      } else {
        return tagResult.result.upserted
      }
    } catch (err) {
      // Catch
      console.log(err); // Log to console
    }
  },
  deleteTag: async (req, res) => {
    // Create delete tag function
    console.log(req.body.tagId); // Log to console
    try {
      // Try
      await Tag.findOneAndDelete({ _id: req.body.tagId }); // Find tag and delete
      console.log('Deleted Tag'); // Log to console
      res.json('Deleted Tag'); // Send response
    } catch (err) {
      // Catch
      console.log(err); // Log to console
    }
  },
};
