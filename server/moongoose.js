const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
  title: String,
  description: String,
  image: {
    data: Buffer,
    contentType: String
  }
});

module.exports = mongoose.model('Image', imageSchema);
