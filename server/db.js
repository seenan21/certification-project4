
const mongoose = require('mongoose')
require('dotenv').config()

const url = process.env.DATABASE_URL
mongoose.set('strictQuery',false)
mongoose.connect(url)

const db = mongoose.connection

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB database');
});

module.exports = db;