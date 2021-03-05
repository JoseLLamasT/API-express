const mongoose = require('mongoose');
const { Schema } = mongoose;
const crazy = new Schema({
  title: { type: String, required: true },
  author_name: { type: String, require: true },
  author_surname: { type: String, require: true },
  favorite: { type: Boolean, require: false },
});
module.exports = mongoose.model('america', crazy);
