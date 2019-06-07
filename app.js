'use strict';

// const events = require('./events.js');
// const constants = require('./constants.js');

const QClient = require('@nmq/q/client');

const fs = require('fs');
const {promisify} = require('util');
const readFileAsync = promisify(fs.readFile);
const writeFileAsync = promisify(fs.writeFile);

const file = process.argv.slice(2).shift();

const transformText = (data) => {
  return data.toString().toUpperCase();
}

readFileAsync(file)
  .then(rawData => transformText(rawData))
  .then(text => writeFileAsync(file, Buffer.from(text)))
  .then(() => {
    QClient.publish('files', 'file-save', `new text saved to ${file}`);
  })
  .catch(error => {
    QClient.publish('files', 'file-save', `Error: ${error}`);
});

module.exports = readFileAsync;