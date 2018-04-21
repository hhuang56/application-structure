/**
 * This file sets up your server and defines your main application file.
 */

//app is your main application file (in our case, app.js)
var app = require('../app');
var http = require('http');

//define your port number here
var port = 3000;
app.set('port', port);

var server = http.createServer(app);

server.listen(port);
server.on('listening', () => {
   console.log("Listening on %s", server.address().port);
});