var QUnit = require("steal-qunit");
var ViewModel = require("./component.component!").ViewModel;
var State = require("canrocks/app");
require("canrocks/models/fixtures/");
var $ = require("jquery");
var F = require("funcunit");
var stache = require("can/view/stache/");

F.attach(QUnit);

// ViewModel unit tests
QUnit.module('<component-page> email/gravatar', {
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

QUnit.module("<component-page> redirection", {
  setup: function(){
    this.state = new State({
      page: "components",
      package: "can-interrupt"
    });
    var template = stache("<component-page package-name='{package}'></component-page>");
    $("#qunit-test-area").html(template(this.state));
  },
  teardown: function(){
    $("#qunit-test-area").empty();
  }
});

QUnit.test("statusCode set to 301 and page changed to the correct page", function(){
  F(".information").exists("component was loaded and rendered");

  var state = this.state;
  F(function(){
    QUnit.equal(state.attr("statusCode"), 301, "Status code set to redirect");
    QUnit.equal(state.attr("page"), "plugins", "Page was changed to the correct page");
  });
});

QUnit.test("doesn't redirect when the page is correct", function(){
  var state;
  F(function(){
    state = new State({
      page: "components",
      package: "bit-grid"
    });
    var template = stache("<component-page package-name='{package}'></component-page>");
    $("#qunit-test-area").html(template(state));
  });

  F(".information").exists("component was loaded and rendered");

  var state = this.state;
  F(function(){
    QUnit.equal(state.attr("statusCode"), undefined, "statusCode did not change");
    QUnit.equal(state.attr("page"), "components", "page did not change");
  });
});

QUnit.module("<component-page> redirection with no type", {
  setup: function(){
    this.state = new State({
      page: "components",
      package: "some-plugin"
    });
    var template = stache("<component-page package-name='{package}'></component-page>");
    $("#qunit-test-area").html(template(this.state));
  },
  teardown: function(){
    $("#qunit-test-area").empty();
  }
});

QUnit.test("redirects to 'other'", function(){
  F(".information").exists("component was loaded and rendered");

  var state = this.state;
  F(function(){
    QUnit.equal(state.attr("statusCode"), 301, "Status code set to redirect");
    QUnit.equal(state.attr("page"), "other", "Page was changed to the correct page");
  });
});
