var Cloudant = require("cloudant");
var cloudant = new Cloudant({
  account: process.env.COUCHUSER,
  password: process.env.COUCHPASS
});
var db = cloudant.db.use("canjs");

module.exports = db;
