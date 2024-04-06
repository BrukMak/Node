var http = require('http');
var requestHandler = require('./requestHandler');



 http.createServer(requestHandler.handleRequest).listen(8000)