const winston = require('winston');
var mysql = require('mysql')
const config = require('config');

module.exports = function() {
  const db = config.get('db');
  var connection = mysql.createConnection(db);

  connection.connect(function(err) {
    if (err) winston.info(`NOT connected to ${db}...`);;
    winston.info(`Connected to ${db}...`);
  });

  return connection;  
}