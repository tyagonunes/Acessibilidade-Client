var express = require('express');

var app = express();

var bodyParser = require('body-parser');

var db_string = 'mongodb://127.0.0.1/mapnode';

var mongoose = require('mongoose').connect(db_string);

var db = mongoose.connection;

db.on('error', console.error.bind(console, "Erro ao conectar no banco"));
db.once('open', function(){
	var localSchema = mongoose.Schema({
		nome: String,
		latitude: Number,
		longitude: Number,
		tipo: String,
		descricao: String,
		acessos: [{type: String}]

	});
	Local = mongoose.model('Local', localSchema);
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(5000);


app.all('/locais', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});


// LISTAR LOCAIS

app.get('/locais', function(req, res) {

	Local.find({}, function(error, locais){
		if(error) {
			res.json({error: 'Não foi possivel salvar usuário'});
		}
		else {
			resp = {success: true, data:locais, message:'Lista de locais'};
			res.json(resp)
		}
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


	new Local({
		'nome': nome,
		'latitude': latitude,
		'longitude': longitude,
		'tipo': tipo,
		'descricao': descricao,
		'acessos': acessos

	}).save(function(error, local) {

		if(error) {
			res.json({error: 'Não foi possivel salvar local'});
		}
		else {
			resp = {success: true, data:[], message:'Local cadastrado com sucesso'};
			res.json(resp)
		}
	});
});


// DELETAR LOCAL

app.delete('/locais/:id', function(req, res){

	var id = req.param.id;

	Local.findById(id, function(error, local){
		if(error) {
			res.json({error: 'Não foi possivel deletar local'});
		}
		else {
			local.remove(function(error){
				if (!error) {
					res.json({response: 'Usuário excluido com sucesso'});
				}
			})
		}
	});
});