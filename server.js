'use strict';
require('dotenv').config();
var express    = require('express'),
app            = express(),
mongoose       = require('mongoose'),
consolidate    = require('consolidate'),
swig           = require('swig'),
bodyParser     = require('body-parser'),
methodOverride = require('method-override'),
_              = require('lodash');

/* ==========================================================
	MONGOOSE
============================================================ */
/*mongoose.connect('mongodb://localhost/hashpix', function(err){
  if(err) {
    console.error('\x1b[31m', 'Could not connect to MongoDB!');
    console.log(err);
  }
});*/

/* ==========================================================
	SETUP
============================================================ */
app.use(express.static(__dirname + '/public'));
app.set('showStackError', true);
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.enable('jsonp callback');
app.use(bodyParser.urlencoded({'extended':'true'}));
app.engine("server.html", consolidate.swig);
app.set("view engine", "server.html");
app.set('views', __dirname + '/server/views');

/* ==========================================================
	ROUTES
============================================================ */
require('./server/routes.js')(app);

/* ==========================================================
	ERRORS
============================================================ */
	// '404' ----------------------------
	app.use(function(req, res, next){
		res.status(404);

		if(req.accepts('html')) {
			return res.send("<h2>Page not available.</h2>");
		}

		if(req.accepts('json')) {
			return res.send({ error: 'Not found!'});
		}

		res.type('txt')
		res.send("Page not available");
	});

	// '500' ----------------------------
	app.use(function(req, res, next){
		console.error('error at %s\n', req.url,err.stack)
		res.send(500, '<pre>' + err.stack + '</pre>')
	});

/* ==========================================================
	APP
============================================================ */
var server = app.listen(3030, function () {
  let host = server.address().address;
  let port = server.address().port;

  console.log('App listening at http://%s:%s', host, port);
});

exports = module.exports = app;
