const mongoose = require('mongoose');

//objeto
const CommentSchema = new mongoose.Schema ({
author:String,
content: String,
date: {type: Date, default: Date.now}
})
 ;
const Comment = mongoose.model('Comment', CommentSchema);
module.exports = Comment;