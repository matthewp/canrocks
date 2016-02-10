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

	var pkgPath = path.resolve(__dirname + "/../package.json");
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

	app.use("/", function (req, res, next) {
		var href = url.parse(req.url).href;

		render(href).then(function(result) {
			var dt = config.doctype || doctype;
			var statusCode = result.state.attr("statusCode") || 200;

      var state = result.state;
      var AppViewModel = state.constructor;
      if(is300Status(statusCode) &&
        AppViewModel.pluginPages[state.attr("page")]) {
        var redirectUrl = can.route.url({
          page: state.attr("page"),
          package: state.attr("package")
        });

        res.redirect(statusCode, redirectUrl);
      } else {
			  res.status(statusCode);
			  res.send(dt + '\n' + result.html);
      }
		}, next);
	});

  require("./crawl");

	return app;
};

function is300Status(statusCode) {
  return statusCode >= 300 && statusCode < 400;
}
