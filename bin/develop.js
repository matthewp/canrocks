#!/usr/bin/env node
var spawn = require("child_process").spawn;

var procs = [
  spawn("node_modules/.bin/steal-tools", ["--watch", "--source-maps-content"]),
  spawn("npm", ["start"])
];

procs.forEach(function(child){
  child.stdout.pipe(process.stdout);
  child.stderr.pipe(process.stderr);
});
