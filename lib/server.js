var path = require('path');
var url = require('url');

var api = require("./api");
var compression = require('compression');
var express = require('express');
var bodyParser = require("body-parser");

var ssr = require("can-ssr");
var xhr = require('./xhr');
var doctype = '<!DOCTYPE html>';

module.exports = function (config) {
	var app = express()
		.use(compression())
    .use(bodyParser.urlencoded({ extended: false }))
		.use(xhr());

	var pkgPath = path.resolve(__dirname + "/../package.json");//path.join(config.path, 'package.json');
	var pkg = require(pkgPath);

	var system = {
		config: pkgPath + '!npm'
	};

	// In production we need to pass in the main, otherwise it doesn't know what
	// bundle to load from.
	if(process.env.NODE_ENV === "production") {
		system.main = (pkg.system && pkg.system.main) || pkg.main;
	}

	var render = ssr(system);


	if (config.configure) {
		config.configure(app);
	}

	app.use(express.static(path.join(config.path)));

  api(app);

	app.use("/", function (req, res) {
		var pathname = url.parse(req.url).pathname;

		render(pathname).then(function(html) {
			var dt = config.doctype || doctype;
			res.send(dt + '\n' + html);
		});
	});

	return app;
};
