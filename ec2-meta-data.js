// Dependencias
var AWS = require('aws-sdk');
var express = require('express'); 
var app = express();

var http = require('http');

var bodyParser = require('body-parser');

// Parsear o conteudo
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// AWS



// Configuração da requisição, cabeçalhos, etc. CORS
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    // Métodos que queremos permitir
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// GET
app.get('/',function(req,res){

    var result;

    var options = {
        host: '169.254.169.254',
        // path: '/latest/meta-data/'
        path: '/latest/meta-data/public-ipv4'
    }
    var request = http.request(options, function (res2) {
        var data = '';
        res2.on('data', function (chunk) {
            data += chunk;
        });
        res2.on('end', function () {
            console.log(data);
            result = data;
        });
    });
    request.on('error', function (e) {
        console.log(e.message);
    });
    request.end();

    var body = '<html>'
        +'  <head>'
        +'  <meta http-equiv="Content-Type" content="text/html" charset="UTF-8"/>'
        +'  </head>'
        +'  <body>'
        +   result
        +'  </body>'
         +'</html>';
    
    res.writeHead(200,{"Content-Type" : "text/html"});
    res.write(body);
    res.end();

});

app.listen(8080,function(){
	console.log("Conectado e escutando na porta 8080");
});
