/*
 * Dependencies
 */

var   util = require('util')
	, http = require('http')
	, url = require('url')



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
	, listeningPath = '/store'
	, validKeys = ['key1', 'key2']



/*
 * Validation
 */
	function validKey( key ) {
		if( validKeys.indexOf( key ) > -1 ) {
			return true;
		}
		return false;
	}

	function validValue( value ) {
		if( (parseFloat(value) == parseInt(value)) && !isNaN(value) ) {
			return true;
		}
		return false;
	}



/*
 * Routing
 */

function routes( req, res ) {
	var   parsedUrl = url.parse( req.url, true )
		, pathname = parsedUrl.pathname
		, key = parsedUrl.query.key
		, value = parsedUrl.query.value
		, ip = req.connection.remoteAddress

	if( pathname == listeningPath && validKey( key ) && validValue( value ) ) {
		res.writeHead( 200, headers );
		util.log( key + ' ' + value + ' ' + ip );
		res.end('ok\n');
	} else {
		res.writeHead( 404 );
		util.log( 'invalid ' + parsedUrl.path );
		res.end();
	}
}



/*
 * Startup
 */

var server = http.createServer( routes );

server.listen( port );

util.log("Server listening on port " + server.address().port);
