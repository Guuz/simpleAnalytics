/*
 * Dependencies
 */

var   util = require('util')
	, http = require('http')
	, url = require('url')
	, fs = require('fs')



/*
 * Configuration
 */

var   port = process.env.PORT || 3000
	, headers = {
		  'Content-Type': 'text/plain'
		, 'Cache-Control': 'no-cache no-store'
		, 'Pragma': 'no-cache'
		, 'X-Robots-Tag': 'noindex'
	  }
	, listeningPath = '/store'
	, validKeys = ['key1', 'key2']
	, months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']



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
 * Output
 */

var store = fs.createWriteStream('store.log', {'flags': 'a'});
/*
store.on('drain', function() {
	console.log('DRAIN');
})
*/
function pad(n) {
	return n < 10 ? '0' + n.toString(10) : n.toString(10);
}

// 26 Feb 16:19:34
function timestamp() {
	var d = new Date();
	var time = [pad(d.getHours()),
				pad(d.getMinutes()),
				pad(d.getSeconds())].join(':');
	return [d.getDate(), months[d.getMonth()], time].join(' ');
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
		store.write( timestamp() + ' - ' + key + ' ' + value + ' ' + ip + '\n' );
		//console.log( store.write( timestamp() + ' - ' + key + ' ' + value + ' ' + ip + '\n' ) );
		res.end('ok\n');
	} else {
		res.writeHead( 404 );
		store.write( timestamp() + ' - ' + 'invalid ' + parsedUrl.path + '\n');
		res.end();
	}
}



/*
 * Startup
 */

var server = http.createServer( routes );

server.listen( port );

util.log("Server listening on port " + server.address().port);
