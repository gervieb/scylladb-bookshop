const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const booksSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
    unique: true,
  },
});
module.exports = mongoose.model("books", booksSchema);
