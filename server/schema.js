const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const MemberSchema = new Schema({
  name: String,
  year: String,
  instrument: String,
  leadership: String,
  portrait: {
    data: Buffer,
    contentType: String
  }
});

module.exports = mongoose.model('Member', MemberSchema);