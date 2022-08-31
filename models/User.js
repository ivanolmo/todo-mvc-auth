const bcrypt = require('bcrypt') // Import bcrypt
const mongoose = require('mongoose') // Import mongoose

const UserSchema = new mongoose.Schema({ // Create schema
  userName: { type: String, unique: true }, // Create userName
  email: { type: String, unique: true }, // Create email
  password: String // Create password
})


// Password hash middleware.

UserSchema.pre('save', function save(next) { // Create pre save
  const user = this // Set user to this
  if (!user.isModified('password')) { return next() } // If password is not modified, return next
  bcrypt.genSalt(10, (err, salt) => { // Generate salt
    if (err) { return next(err) } // If error, return next with error
    bcrypt.hash(user.password, salt, (err, hash) => { // Hash password
      if (err) { return next(err) } // If error, return next with error
      user.password = hash // Set password to hash
      next() // Return next
    })
  })
})


// Helper method for validating user's password.

UserSchema.methods.comparePassword = function comparePassword(candidatePassword, cb) { // Create comparePassword method
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => { // Compare password
    cb(err, isMatch) // Return callback with error and isMatch
  })
}


module.exports = mongoose.model('User', UserSchema) // Export model
