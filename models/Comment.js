const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
  author: String,
  date: { type: Date, default: Date.now },
  content: String
});

const Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;