// Dependencias
var AWS = require('aws-sdk');
var express = require('express'); 
var app = express();

var bodyParser = require('body-parser');

// Parsear o conteudo
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// AWS
var s3 = new AWS.S3();

var metaData = new AWS.MetadataService();

console.log(metaData);

metaData.request('public-ip', function(err, data){
    if (err) {
        console.log(err);
    } else {
        console.log(data);
    }
});

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

    var params = {
      Bucket: 'cloudninja-jon', 
      Key: 'arquivo.txt'
    };
    s3.getObject(params, function(err, data) {
        if (err) {
            returnS3(err);
            console.log(err);
        } else {
            returnS3(data);
            console.log(data);
        }
    });

    var returnS3 = function(result){
        // result = JSON.stringify(result);
        var container = result.Body.toString();
        var body = '<html>'
  		    +'	<head>'
  		    +'	<meta http-equiv="Content-Type" content="text/html" charset="UTF-8"/>'
  		    +'	</head>'
  		    +'	<body>'
  		    +	container
  		    +'	</body>'
  	         +'</html>';
        console.log(container);
        res.writeHead(200,{"Content-Type" : "text/html"});
        res.write(body);
        res.end();
    }
	
});

app.listen(8080,function(){
	console.log("Conectado e escutando na porta 8080");
});
