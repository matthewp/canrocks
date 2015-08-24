var route = require("can/route/");
require("can/route/pushstate/");

route(":page", { page: "home", query: null });
route(":page/:package");

var env = require("@loader").env;
if(env === "development" && location.port != 8080) {
  route.defaultBinding = "hashchange";
}
