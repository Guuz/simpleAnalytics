/*
 * Module dependencies.
 */

var   util = require('util')
	, http = require('http')



/*
 * Configuration
 */

var   port = process.env.PORT || 3000
	, headers = {
		  'Content-Type': 'text/plain'
		, 'Cache-Control': 'no-cache'
		, 'Pragma': 'no-cache'
		, 'X-Robots-Tag': 'noindex'
	}



/*
 * Startup
 */

var server = http.createServer(function( req, res ) {
	res.writeHead( 200, headers );
	res.end('Hello World\n');
});

server.listen( port );

util.log("Server listening on port " + server.address().port);
