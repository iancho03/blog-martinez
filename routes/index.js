const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Post = require('../models/Post');
const Comment = require('../models/Comment');

const limits = {
  fileSize: 2 * 1024 * 1024
};

const fileFilter = (req, file, cb) => {
  if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png')
    cb(null, true);
  else
    cb(null, false);
};

const upload = multer({ storage: storage, fileFilter: fileFilter, limits: limits });

// mariadb connection
const connection = require('../connection');

router.get('/', (req, res) => {
  Post.find().exec((err, posts) => {
    res.render('index', { posts: posts });
  });
});

router.get('/gallery', (req, res) => {
  Photo.find().exec((err, photos) => {
    res.render('gallery', { photos: photos });
  });
});

router.post('/gallery', upload.single('image'), (req, res) => {
  // console.log(req.file);
  // console.log('\n', req.body.title);
  const photo = new Photo({
    title: req.body.title,
    image: req.file.path
  });
  photo.save(err => {
    res.redirect('/gallery');
  });
});

router.get('/sql', (req, res) => {
  res.render('sql', { query: null });
});

router.post('/sql', (req, res) => {
  const query = req.body.query
  connection.query(query, (err, rs, md) => {
    res.render('sql', { error: err, results: rs, fields: md, query: query });
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

module.exports = router;