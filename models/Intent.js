const mongoose = require('mongoose');

const IntentSchema = new mongoose.Schema({
  intent_name: String,
  sub_intent_name: String,
  point: Number
})

module.exports = mongoose.model('Intent', IntentSchema)