const mongoose = require('mongoose'); // Import mongoose

const connectDB = async () => {
  // Create async function
  try {
    // Try
    const conn = await mongoose.connect(process.env.DB_STRING, {
      // Connect to database
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`); // Log to console
  } catch (err) {
    // Catch
    console.error(err); // Log to console
    process.exit(1); // Exit with failure
  }
};

module.exports = connectDB; // Export connectDB
