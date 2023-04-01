const mongoose = require('mongoose');

const WordSchema = new mongoose.Schema({
  value: String,
  word_name: String,
})

module.exports = mongoose.model('Word', WordSchema)