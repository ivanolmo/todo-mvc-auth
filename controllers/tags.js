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
    try {
      const tagIds = [] // Stores ids of all tags, new or upserted
      let tags = req.body.tags.split(',').map(e => e.toLowerCase().trim()).filter(Boolean) // Split tags by commas and filter out any empty tags
      for (let tag of tags) { // Loop through tags to add them
        const tagId = await Tag.findOneAndUpdate( // Using findOneAndUpdate so it will only insert tags that don't already exist, but will also return IDs of existing tags
          { tag: tag },
          { $set: { tag: tag, userId: req.user.id } },
          { new: true,
            upsert: true }
        )
        tagIds.push(tagId._id)
      }
      console.log('Tags have been added!'); // Log to console
      if ( !req.body.todoItem ) {
        res.redirect('/tags'); // Redirect to tags if editing tags in the Tags view
      } else {
        return tagIds // Otherwise return a list of tag IDs
      }
    } catch (err) {
      // Catch
      console.log(err); // Log to console
    }
  },
  deleteTag: async (req, res) => {
    // Create delete tag function
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
  updateTag: async (req, res) => {
    // Create the update tag function
    try {
      await Tag.findOneAndUpdate(
        { _id: req.body.tagId },
        { tag: req.body.tag }
      )
      console.log('Updated tag')
      res.json('Updated tag')
    } catch (err) {
      // Catch
      console.log(err); // Log to console
    }
  }
};
