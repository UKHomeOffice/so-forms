'use strict';

const winston = require('winston');

const loggingTransports = [];
const exceptionTransports = [];
const notProd = true;

const levels = {
  info: 0,
  email: 1,
  warn: 2,
  error: 3
};

const colors = {
  info: 'green',
  email: 'magenta',
  warn: 'yellow',
  error: 'red'
};

loggingTransports.push(
  new (winston.transports.Console)({
    json: (notProd === true) ? false : true,
    timestamp: true,
    colorize: true,
    stringify(obj) {
      return JSON.stringify(obj);
    }
  })
);

exceptionTransports.push(
  new (winston.transports.Console)({
    json: (notProd === true) ? false : true,
    timestamp: true,
    colorize: true,
    stringify: function stringify(obj) {
      return JSON.stringify(obj);
    }
  })
);

const transports = {
  levels,
  transports: loggingTransports,
  exceptionHandlers: exceptionTransports,
  exitOnError: true
};

if (notProd) {
  delete transports.exceptionHandlers;
}

const logger = new (winston.Logger)(transports);

winston.addColors(colors);

module.exports = logger;
