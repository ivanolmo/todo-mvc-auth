module.exports = { // Export object
    ensureAuth: function (req, res, next) { // Create ensureAuth function
      if (req.isAuthenticated()) { // If user is authenticated
        return next() // Return next
      } else { // If user is not authenticated
        res.redirect('/') // Redirect to home
      }
    }
  }
  