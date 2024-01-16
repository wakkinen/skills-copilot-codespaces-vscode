// Create web server
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

// connect to mongodb
mongoose.connect('mongodb://localhost/comments');

// create schema
var commentSchema = new mongoose.Schema({
  name: String,
  comment: String
});

// create model
var Comment = mongoose.model('Comment', commentSchema);

// use ejs
app.set('view engine', 'ejs');

// use body-parser
app.use(bodyParser.urlencoded({extended: true}));

// use css
app.use(express.static(__dirname + '/public'));

// home page
app.get('/', function(req, res) {
  res.render('home');
});

// add comment
app.post('/addcomment', function(req, res) {
  var newComment = new Comment({
    name: req.body.name,
    comment: req.body.comment
  });
  newComment.save(function(err, Comment) {
    if(err) {
      console.log('Error saving comment');
    } else {
      console.log('Comment saved');
      console.log(Comment);
      res.redirect('/comments');
    }
  });
});

// show comments
app.get('/comments', function(req, res) {
  Comment.find({}, function(err, comments) {
    if(err) {
      console.log('Error finding comments');
    } else {
      console.log('Comments found');
      res.render('comments', {comments: comments});
    }
  });
});

// start server
app.listen(3000, function() {
  console.log('Server started on port 3000');
});
