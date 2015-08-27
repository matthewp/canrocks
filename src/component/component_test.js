var QUnit = require("steal-qunit");
var ViewModel = require("./component.component!").ViewModel;
require("canrocks/models/fixtures/");

// ViewModel unit tests
QUnit.module('component-page email/gravatar', {
  setup: function(){
    this.vm = new ViewModel({
      packageName: "testPackage",
      component: {
        maintainers: "matthewp <matthew@matthewphillips.info>"
      }
    });
  }
});

QUnit.test("Gets the maintainer's email", function(){
  var vm = this.vm;
  var expected = "matthew@matthewphillips.info";
  var maintainers = vm.attr("maintainers");
  QUnit.equal(maintainers.attr(0).attr("email"), expected, "got the correct emails");
});

QUnit.test("Gets the maintainer's gravatar", function(){
  var vm = this.vm;

  var expected = "http://www.gravatar.com/avatar/4394f414f0d4a043ad5e8fa261fa2953?r=g&s=50";
  var maintainers = vm.attr("maintainers");
  QUnit.equal(maintainers.attr(0).attr("gravatarUrl"), expected, "got the correct gravatar url");
});
