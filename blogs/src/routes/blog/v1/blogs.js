const express = require('express');
const router = express.Router();
var mysql = require('mysql');
var connection = require('../../../startup/db')();

  router.post('/:blogID/publish', async (req, res) => {
    query = `UPDATE blogger.blogs
                    SET
                    status = 'published'
                    WHERE blogID = ${req.params.blogID}`;

    connection.query(query, function (err, result, fields) {
      if (err) winston.error(`/:blogID/publish ${err}...`);
      if(!result) return res.status(404).send('The blogs was not found.');
      res.send(`status updated for ${req.params.blogID}`);
    });

  });
  
  router.post('/', async (req, res) => {
    
    query = `INSERT INTO blogger.blogs ( blogs.title, blogs.content ) VALUES
                                      (
                                        '${req.body.title}',
                                        '${req.body.content}'
                                      );`

    connection.query(query, function (err, result, fields) {
      if (err) winston.error(`/ ${err}...`);
      if(!result) return res.status(404).send('The blogs was not found.');
      res.send(`${req.body.title}, blog addedwith status draft`);
    });
  });
  
  router.get('/:blogID', async (req, res) => {
   
    query = `SELECT blogs.blogID,
                    blogs.title,
                    blogs.content,
                    blogs.author,
                    blogs.dateCreted,
                    blogs.dateModified,
                    blogs.datePublished,
                    blogs.status
                FROM blogger.blogs`;

    if(req.params.blogID!='all')
    {
        query = `${query} where blogs.status='published' and blogs.blogID=${req.params.blogID}`

    }
   
    connection.query(query, function (err, result, fields) {
      if (err) winston.error(`/:blogID ${err}...`);
      if(!result) return res.status(404).send('The blog is not found.');
      res.send(result);
    });
  
  });

  router.get('/', async (req, res) => {
    query = `SELECT blogs.blogID,
                    blogs.title,
                    blogs.content,
                    blogs.author,
                    blogs.dateCreted,
                    blogs.dateModified,
                    blogs.datePublished,
                    blogs.status
                FROM blogger.blogs where blogs.status='published';`;

    

    connection.query(query, function (err, result, fields) {
      if (err) winston.error(`/ ${err}...`);
      if(!result) return res.status(404).send('The blogs are not found.');
      res.send(result);
    });
    
  });

  

  router.delete('/:blogID', async (req, res) => {
    console.log(req.params.blogID)
    query = `DELETE FROM blogger.blogs
                          WHERE blogs.blogID=${req.params.blogID};`;

                          connection.query(query, function (err, result, fields) {
                            if (err) throw err;
                            if(!result) return res.status(404).send('blog deleted');
                            res.send(result);
                          });
    
  });

  
  
module.exports = router; 