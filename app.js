'use strict';

// const events = require('./events.js');
// const constants = require('./constants.js');

const QClient = require('@nmq/q/client');

const fs = require('fs');
const {promisify} = require('util');
const readFileAsync = promisify(fs.readFile);
const writeFileAsync = promisify(fs.writeFile);

const transformText = (data) => {
  return data.toString().toUpperCase();
};

const args = process.argv.slice(2);
const file = args[0];

const messageData = {}
readFileAsync(file)
  .then(rawData => {
    messageData.rawData = rawData;
    return transformText(rawData)
  })
  .then(text => {
    messageData.text = text;
    writeFileAsync(file, Buffer.from(text))
  })
  .then(() => {
    QClient.publish('files', 'file-save', {
      message: 'File read, transformed, and written',
      oldText: messageData.rawData.toString(),
      newText: messageData.text,
      filepath: file,
    });
  })
  .catch(error => {
    console.log(error)
    QClient.publish('files', 'file-error', error);
});

module.exports = readFileAsync;