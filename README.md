## Lab 19 - Q Server with API
Implementation of the Q manager for event driven apps
#### Author: Chris Kozlowski

## Links and Resources
#### This lab is broken down into three seperate repos
* [API Server/Q Server](https://github.com/401-advanced-javascript-cdk/lab19-q-api-server/pull/1)
* [Q Client](https://github.com/401-advanced-javascript-cdk/lab-19/lab19-app-client/pull/1)
* [Q Logger](https://github.com/401-advanced-javascript-cdk/lab19-q-logger/pull/1)

## Modules
### API Server/Q Server
#### `index.js`
Connects to MongoDB, starts API server, and creates Q Server namespaces for `files` and `database`
#### `src/app.js`
Contains CRUD API server routes for creating, reading, updating, and deleting file references
#### `src/models/files.js`
Defines methods for interaction with MongoDB
#### `src/models/schemas/files-schema.js`
Defines the structure of documents for MongoDB

### Q Client
#### `app.js`
Performs file transformations from the filepath supplied on the commandline, and publishes the results to the Q Client

### Q Logger
#### `logger.js`
Listens in the `files` and `database` namespaces for any events from either the API Server or the Q Client, and creates logs in the console
## Operation
#### 1. API Server/Q Server
* `nodemon` - Starts both the API Server and Q server.
#### 2. Q Logger
* `nodemon logger.js` - Starts the logger and begins listening for events.
#### 3. Q Client
* `node app.js ./files/test.txt` - Performs the transformation on the file, publishes the results, then closes.
#### 4. API Calls
The following routes can be used to access the database.  All routes will publish events that will be picked up and logged by the logger.
* `GET /files` - gets all files
* `GET /files/:id` - gets the file with the given id.
* `POST /files` - creates a file.  Requires a filepath string.
* `PUT /files/:id` - updates the given id with the new data.  Requires a filepath and an id.
* `DELETE /files/:id` - deletes the file with the given id.