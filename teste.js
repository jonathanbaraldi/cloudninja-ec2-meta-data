var http = require('http');

var client = http.createClient(80, "169.254.169.254/latest/meta-data");
request = client.request();
request.on('response', function( res ) {
    res.on('data', function( data ) {
        console.log( data.toString());
    } );
} );
request.end();


