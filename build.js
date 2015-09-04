var stealTools = require("steal-tools");

stealTools.build({
  config: __dirname + "/package.json!npm"
}, {
  bundlesPath: "dist/bundles",
  bundleAssets: true,
  minify: false
});
