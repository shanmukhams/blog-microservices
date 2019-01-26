const express = require('express');
const blogs = require('../routes/blog/v1/blogs');
const error = require('../middleware/error');

module.exports = function(app) {
  app.use(express.json());
   
  app.use('/api/v1/blogs', blogs);
  app.use(error);
}