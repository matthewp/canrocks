require("heapdump");
var server = require("./server");

var app = server({
  path: process.cwd()
});

var port = process.env.PORT || 3030;
app.listen(port);

console.error("App running on http://localhost:" + port);
