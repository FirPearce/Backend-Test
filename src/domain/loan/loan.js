const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const loanSchema = new Schema({
  code: {
    type: String,
    required: true,
    unique: true,
  },
  memberCode: {
    type: String,
    required: true,
  },
  bookCode: {
    type: String,
    required: true,
  },
  loan_date: {
    type: Date,
    default: Date.now,
  },
  return_date: {
    type: Date,
    default: null,
  },
  status_loan: {
    type: String,
    enum: ["Returned", "Not Returned"],
    default: "Not Returned",
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

module.exports = mongoose.model("loan_books", loanSchema, "loan_books");
