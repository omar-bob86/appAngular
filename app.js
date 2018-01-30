'use strict'

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

// Cargar rutas
var user_routes = require('./routes/user');
var artist_routes = require('./routes/artist');
var album_routes = require('./routes/album');
var album_song = require('./routes/song');

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


//Configurar cabeceras http
app.use((req, res, next) => {
	res.headers('Access-Control-Allow-Origin', '*');
	res.headers('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Access-Control-Allow-Request-Method');
	res.headers('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
	res.headers('Allow', 'GET, POST, OPTIONS, PUT, DELETE');

	next();
});

//Rutas base
app.use('/api', user_routes);
app.use('/api', artist_routes);
app.use('/api', album_routes);
app.use('/api', album_song);

module.exports = app;