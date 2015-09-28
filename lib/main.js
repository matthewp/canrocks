var heapdump = require("heapdump");
process.once("uncaughtException", function (err) {
  heapdump.writeSnapshot();
  console.error("Exiting beause of:", err);
  process.exit(1);
});

var server = require("./server");

var app = server({
  path: process.cwd()
});

var port = process.env.PORT || 3030;
app.listen(port);

console.error("App running on http://localhost:" + port);
