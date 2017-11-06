var app = require('./config/app_config');

var db =  require('./config/db_config');

var Local = require('./models/local');

var localController = require('./controllers/localController');

// var express = require('express');

// var app = express();

// var bodyParser = require('body-parser');

// var db_string = 'mongodb://127.0.0.1/mapnode';

// var mongoose = require('mongoose').connect(db_string);

// var db = mongoose.connection;

// db.on('error', console.error.bind(console, "Erro ao conectar no banco"));
// db.once('open', function(){
// 	var localSchema = mongoose.Schema({
// 		nome: String,
// 		latitude: Number,
// 		longitude: Number,
// 		tipo: String,
// 		descricao: String,
// 		acessos: [{type: String}]

// 	});
// 	Local = mongoose.model('Local', localSchema);
// });

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// app.use(function(req, res, next) {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE");
//   res.setHeader("Access-Control-Allow-Headers", "X-Requested-With, content-type, Authorization");
//   next();
// });

// app.listen(5000);

// LISTAR LOCAIS

app.get('/', function(req, res) {
	res.end('Bem vindo a API');	
});



app.get('/locais', function(req, res) {

	localController.list(function(resp){
		res.json(resp);
	});

});


// BUSCAR LOCAL POR ID

app.get('/locais/:id', function(req, res){

	var id = req.param.id;

	Local.findById(id, function(error, locais){
		if(error) {
			res.json({error: 'Não foi possivel encontrar local'});
		}
		else {
			res.json(locais)
		}
	});
});

// SALVAR LOCAL

app.post('/locais', function(req, res){

	var nome = req.body.Nome;
	var latitude = req.body.Latitude;
	var longitude = req.body.Longitude;
	var tipo = req.body.Tipo;
	var descricao = req.body.Descricao;
	var acessos = req.body.Acessos;

	localController.save(nome, latitude, longitude, tipo, descricao, acessos, function (resp) {
		res.json(resp);
	})

});


// DELETAR LOCAL

app.delete('/locais/:id', function(req, res){

	var id = req.params['id'];
	

	localController.delete(id, function (resp) {
		res.json(resp);
	})

});