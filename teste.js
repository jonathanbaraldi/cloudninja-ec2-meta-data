var http = require('http');

var options = {
    host: '169.254.169.254',
    // path: '/latest/meta-data/'
    path: '/latest/meta-data/public-ipv4'
}
var request = http.request(options, function (res) {
    var data = '';
    res.on('data', function (chunk) {
        data += chunk;
    });
    res.on('end', function () {
        console.log(data);

    });
});
request.on('error', function (e) {
    console.log(e.message);
});
request.end();


