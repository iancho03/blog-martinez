const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  title: String,
  subtitle: String,
  author: String,
  date: { type: Date, default: Date.now },
  content: String,
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }]
});

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;