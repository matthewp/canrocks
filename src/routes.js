var route = require("can/route/");
require("can/route/pushstate/");

route(":page", { page: "home", query: null, package: null });
route(":page/:package");

var env = require("@loader").env;
var ports = { 8080: true, 3030: true };
if(env === "development" && !ports[location.port]) {
  route.defaultBinding = "hashchange";
}
