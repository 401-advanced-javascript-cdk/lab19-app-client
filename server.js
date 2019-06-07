'use strict';

const QServer = require('@nmq/q/server');

QServer.start();

const files = new QServer('files');
files.monitorEvent('file-save');
files.monitorEvent('file-error');

const database = new QServer('database');

database.monitorEvent('create');
database.monitorEvent('read');
database.monitorEvent('update');
database.monitorEvent('delete');
database.monitorEvent('error');