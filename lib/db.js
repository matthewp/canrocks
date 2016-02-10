var Cloudant = require("cloudant");

if(!process.env.COUCHUSER || !process.env.COUCHPASS) {
  throw new Error("The environment variables COUCHUSER and COUCHPASS are required.");
}

var cloudant = new Cloudant({
  account: process.env.COUCHUSER,
  password: process.env.COUCHPASS
});
var db = cloudant.db.use("canjs");

module.exports = db;
