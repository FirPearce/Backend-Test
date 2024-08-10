const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookSchema = new Schema({
  code: {
    type: String,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  status_book: {
    type: String,
    enum: ["Available", "Not Available"],
    default: function () {
      return this.stock > 0 ? "Available" : "Not Available";
    },
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("books", bookSchema, "books");
