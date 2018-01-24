'use strict'

var path = require('path');
var fs = require('fs');
var mongoosePaginate = require('mongoose-pagination');

var Artist = require('../models/artist');
var Album = require('../models/album');
var Song = require('../models/song');

function getArtist(req, res) {
	var artistId = req.params.id;

	Artist.findById(artistId, (err, artist) => {
		if (err) {
			res.status(500).send({message: 'Error en pa petición'});
		}else{
			if(!artist){
				res.status(404).send({message: 'El artidta no existe'});
			}else{
				res.status(200).send({artist});
			}
		}
	});
}

function getArtists(req, res){
	var page = req.params.page;
	var itemsPerPage = 3;

	Artist.find().sort('name').paginate(page, itemsPerPage, function(err, artists, total){
		if(err){
			res.status(500).send({message: 'Error en la peticion.'})
		}else{

		}
	});
}

function saveArtist(req, res){
	var artist = new Artist();

	var params = req.body;
	artist.name = params.name;
	artist.description = params.description;
	artist.image = 'null';

	artist.save((err, artistStored) => {
		if(err){
			res.status(500).send({message: 'Error al guardar el artista'});
		}else{
			if(!artistStored){
				res.status(404).send({message: 'El artista no ha sido guardado'});
			}else{
				res.status(200).send({artist: artistStored});
			}
		}
	});

}

module.exports = {
	getArtist,
	saveArtist,
	getArtist
}