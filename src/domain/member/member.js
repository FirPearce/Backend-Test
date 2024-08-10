const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const memberSchema = new Schema({
  code: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  status_member: {
    type: String,
    enum: ["Active", "Penalized"],
    default: "Active",
  },
  penalize_date: {
    type: Date,
    default: null,
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

module.exports = mongoose.model("members", memberSchema, "members");
