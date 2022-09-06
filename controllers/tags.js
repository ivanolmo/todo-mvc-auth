const Tag = require('../models/Tag'); // Import tag model

module.exports = {
  // Export module
  getTags: async (req, res) => {
    // Create get tags function
    try {
      // Try
      const tags = await Tag.find({ userId: req.user.id }); // Find tags
      res.render('tags.ejs', {
        tags: tags,
        user: req.user,
        display: {  editable: true,
                    deletable: true}
      }); // Render tags.ejs
    } catch (err) {
      // Catch
      console.error(err); // Log to console
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
      if ( req.body.todoItem || req.body.todo ) {
        return tagIds
      } else {
        res.json({tagIds: tagIds})
      }
    } catch (err) {
      // Catch
      console.error(err); // Log to console
    }
  },
  deleteTag: async (req, res) => {
    // Create delete tag function
    try {
      // Try
      //const tag = await Tag.findOne({ _id: req.body.tagId })
      const tag = await Tag.findOneAndDelete({ _id: req.body.tagId }); // Find tag and delete
      res.json({success: true, tagId: req.body.tagId }); // Send response
    } catch (err) {
      // Catch
      console.error(err); // Log to console
    }
  },
  updateTag: async (req, res) => {
    // Create the update tag function
    try {
      await Tag.findOneAndUpdate(
        { _id: req.body.tagId },
        { tag: req.body.tag }
      )
      res.json('Updated tag')
    } catch (err) {
      // Catch
      console.error(err); // Log to console
    }
  },
  getTag: async (req, res) => {
    try {
      const tag = await Tag.findOne({ _id: req.body.tagId })
      res.json(tag.tag)
    } catch (err) {
      console.error(err)
    }
  }
};
