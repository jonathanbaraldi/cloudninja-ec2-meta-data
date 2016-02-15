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

    var options = {
      host: '169.254.169.254',
      path: '/latest/meta-data/',
      method: 'GET'
    };

    var req = http.request(options, function(res) {
      console.log('STATUS: ' + res.statusCode);
      console.log('HEADERS: ' + JSON.stringify(res.headers));
      res.setEncoding('utf8');
      
      res.on('data', function (chunk) {
        
        console.log('BODY: ' + chunk);

        var body = '<html>'
            +'  <head>'
            +'  <meta http-equiv="Content-Type" content="text/html" charset="UTF-8"/>'
            +'  </head>'
            +'  <body>'
            +   chunk
            +'  </body>'
             +'</html>';
        
        res.writeHead(200,{"Content-Type" : "text/html"});
        res.write(body);
        res.end();



      });
    });

    req.on('error', function(e) {
      console.log('problem with request: ' + e.message);
    });

	
});

app.listen(8080,function(){
	console.log("Conectado e escutando na porta 8080");
});
