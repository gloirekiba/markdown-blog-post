const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: () => Date.now(),
    imnutable: true,
  },
  updatedAt: {
    type: Date,
    default: () => Date.now(),
  },
  markdown: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Article", articleSchema);