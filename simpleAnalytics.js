/*
 * Module dependencies.
 */

var   util = require('util')
	, http = require('http')



/**
 * Startup
 */
var port = process.env.PORT || 3000;

var server = http.createServer(function( req, res ) {
	res.writeHead(200, {'Content-Type': 'text/plain'});
	res.end('Hello World\n');
});

server.listen( port );

util.log("Server listening on port " + server.address().port);
