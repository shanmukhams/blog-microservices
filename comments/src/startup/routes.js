const express = require('express');
const comments = require('../routes/comment/v1/comments');
const error = require('../middleware/error');

module.exports = function(app) {
  app.use(express.json());
   
  app.use('/api/v1/blogs', comments);
  app.use(error);
}