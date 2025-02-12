const mongoose = require('mongoose');
require('dotenv').config();
console.log("Loaded MONGO_URI:", process.env.MONGO_URI);

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {//replace process.env.MONGO_URI with your mongo url or store your mongodb atlas url in .env 
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

module.exports = connectDB;