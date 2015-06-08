var express = require('express');
var router = express.Router();
var glob = require('glob');
var fs = require('fs');
var player = require('./player');


/* GET home page. */
router.get('/', function(req, res, next) {
	var data = {};
	data.title = 'WifiPlayer';
	data.files = [];

	glob("/Users/Eduardo/Music/*.mp3", {mark: true}, function (er, files) {
	  // files is an array of filenames. 
	  // If the `nonull` option is set, and nothing 
	  // was found, then files is ["**/*.js"] 
	  // er is an error object or null.
	  files.forEach(function(item){
	  	player.addToPlaylist(item);
	  	data.files.push(player.getMetadata(item));
	  });
	  //data.files = files;

	  res.render('index', data);
	});
	
});

router.get('/state', function(req, res){
	var data = {}; 
	data.state = player.getState().toString();
	data.song_index = null;
	
	var index = player.getSongIndex();
	if(index != null)
		data.song_index = index.toString();
	res.json(data);
});

router.get('/listmusic', function(req, res){
	
	// options is optional 
	glob("/Users/Eduardo/Music/*.mp3", {mark: true}, function (er, files) {
	  // files is an array of filenames. 
	  // If the `nonull` option is set, and nothing 
	  // was found, then files is ["**/*.js"] 
	  // er is an error object or null.
	  res.send(files);
	});
});

router.get('/play',function(req, res){
	var index = req.query.i;
	player.play(index);
	res.status(200).send();
});

router.get('/pause', function(req, res){
	player.pause();
	res.status(200).send();
});

router.get('/resume',function(req, res){
	player.resume();
	res.status(200).send();
});

router.get('/stop',function(req, res){
	player.stop();
	res.status(200).send();
});

router.get('/backward',function(req, res){
	player.backward();
	res.status(200).send();
});

router.get('/forward', function(req, res){
	player.forward();
	res.status(200).send();
});

module.exports = router; 
