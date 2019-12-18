const express = require('express');
const router = express.Router();
const Post = require ('../models/Post');
const mongoose = require ('mongoose');
const Comment = require('../models/Comment');

router.get('/', (req, res) => {
  Post.find().exec((err, posts) => {
    res.render('index', { posts: posts });
  });
});

router.post('/newpost', (req, res) => {
  const post = new Post({
    title: req.body.title,
    subtitle: req.body.subtitle,
    author: req.body.author,
    content: req.body.content
  });
  post.save(err => {
    res.redirect('/');
});
});

router.get('/posts/:id', (req, res) => {
  Post.findById(req.params.id).populate('comments').exec((err, post) => {
    res.render('post', { post: post });
  });
});

router.get('/newpost', (req, res) => {
  res.render('newpost');
});

router.post('/newcomment', (req, res) => {
  const comment = new Comment({
    _id: new mongoose.Types.ObjectId(),
    author: req.body.author,
    content: req.body.content
  });
  comment.save(err => {
    Post.findById(req.body.postId).exec((err, post) => {
      post.comments.push(comment._id);
      post.save(err => {
        res.redirect('/posts/' + req.body.postId);
      });
    });
  });
});

module.exports = router;