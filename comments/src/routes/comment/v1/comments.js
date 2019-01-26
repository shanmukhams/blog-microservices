const express = require('express');
const router = express.Router();
var mysql = require('mysql')
var connection = require('../../../startup/db')();


  router.post('/:blogID/comments', async (req, res) => {
    query = `INSERT INTO blogger.comments
                        (
                            blogID,
                            comment,
                            userID
                        )
                        VALUES
                        (
                            (SELECT blogs.blogID FROM blogger.blogs where blogs.status='published' and blogID = ${req.body.blogID}),
                            '${req.body.comment}',
                            '${req.body.userID}'
                        )`;

    connection.query(query, function (err, result, fields) {
      if (err) throw err;
      if(!result) return res.status(404).send('The blogs was not found.');
      res.send(`status updated for ${req.params.blogID}`);
    });

    
  });

  router.get('/:blogID/comments', async (req, res) => {
    query = `SELECT comments.commentID,
                    comments.blogID,
                    comments.userID,
                    comments.comment,
                    comments.dateCreted,
                    comments.dateModified
                FROM blogger.comments where comments.blogID=${req.params.blogID};`

    connection.query(query, function (err, result, fields) {
      if (err) winston.error(`/:blogID/comments ${err}...`);
      if(!result) return res.status(404).send('The blog comments was not found.');
      res.send(result);
    });
    
  });

  router.get('/:blogID/comments/:commentID', async (req, res) => {
    query = `SELECT comments.commentID,
                    comments.blogID,
                    comments.userID,
                    comments.comment,
                    comments.dateCreted,
                    comments.dateModified
                FROM blogger.comments where comments.blogID=${req.params.blogID} and comments.commentID=${req.params.commentID};`

    connection.query(query, function (err, result, fields) {
      if (err) winston.error(`/:blogID/comments/:commentID ${err}...`);
      if(!result) return res.status(404).send('The blog comments was not found.');
      res.send(result);
    });
    
  });

  
  
  
module.exports = router; 