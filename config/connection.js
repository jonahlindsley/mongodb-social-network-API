const mongoose = require('mongoose');
const is_production = process.env.NODE_ENV;

// Wrap Mongoose around local connection to MongoDB
const url = is_production ? 'mongodb+srv://jonahlindsley:sapp21HIRE@cluster0.g5pi4fj.mongodb.net/?retryWrites=true&w=majority' : 'mongodb://localhost:27017/social-media-api'
mongoose.connect(url, {

  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Export connection
module.exports = mongoose.connection;