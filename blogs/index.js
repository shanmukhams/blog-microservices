const winston = require('winston');
const express = require('express');
const app = express();

const blogs = require('./routes/blog/v1/blogs');

require('./src/startup/logging')();
require('./src/startup/routes')(app);
require('./src/startup/db')();
require('./src/startup/config')();

const port =  3014;
const server = app.listen(port, () => winston.info(`Listening on port ${port}...`));

module.exports = server;