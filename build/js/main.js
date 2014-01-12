(function(/*! Brunch !*/) {
  'use strict';

  var globals = typeof window !== 'undefined' ? window : global;
  if (typeof globals.require === 'function') return;

  var modules = {};
  var cache = {};

  var has = function(object, name) {
    return ({}).hasOwnProperty.call(object, name);
  };

  var expand = function(root, name) {
    var results = [], parts, part;
    if (/^\.\.?(\/|$)/.test(name)) {
      parts = [root, name].join('/').split('/');
    } else {
      parts = name.split('/');
    }
    for (var i = 0, length = parts.length; i < length; i++) {
      part = parts[i];
      if (part === '..') {
        results.pop();
      } else if (part !== '.' && part !== '') {
        results.push(part);
      }
    }
    return results.join('/');
  };

  var dirname = function(path) {
    return path.split('/').slice(0, -1).join('/');
  };

  var localRequire = function(path) {
    return function(name) {
      var dir = dirname(path);
      var absolute = expand(dir, name);
      return globals.require(absolute, path);
    };
  };

  var initModule = function(name, definition) {
    var module = {id: name, exports: {}};
    cache[name] = module;
    definition(module.exports, localRequire(name), module);
    return module.exports;
  };

  var require = function(name, loaderPath) {
    var path = expand(name, '.');
    if (loaderPath == null) loaderPath = '/';

    if (has(cache, path)) return cache[path].exports;
    if (has(modules, path)) return initModule(path, modules[path]);

    var dirIndex = expand(path, './index');
    if (has(cache, dirIndex)) return cache[dirIndex].exports;
    if (has(modules, dirIndex)) return initModule(dirIndex, modules[dirIndex]);

    throw new Error('Cannot find module "' + name + '" from '+ '"' + loaderPath + '"');
  };

  var define = function(bundle, fn) {
    if (typeof bundle === 'object') {
      for (var key in bundle) {
        if (has(bundle, key)) {
          modules[key] = bundle[key];
        }
      }
    } else {
      modules[bundle] = fn;
    }
  };

  var list = function() {
    var result = [];
    for (var item in modules) {
      if (has(modules, item)) {
        result.push(item);
      }
    }
    return result;
  };

  globals.require = require;
  globals.require.define = define;
  globals.require.register = define;
  globals.require.list = list;
  globals.require.brunch = true;
})();
require.register("application", function(exports, require, module) {
var Router = require('router'),
    Controller = require('controller');

var APP = new Backbone.Marionette.Application();

APP.addRegions({
    body: 'body'
});

APP.addInitializer(function() {
    Swag.registerHelpers();
});

APP.addInitializer(function() {

	// master router/controller
	APP.masterController = new Controller({region: this.body});
	APP.masterRouter = new Router({
		controller: APP.masterController
	});
});

APP.on('initialize:after', function() {
    Backbone.history.start();
});

module.exports = APP;

});

;require.register("controller", function(exports, require, module) {
var Layout = require('views/default'),
	Splash = require('views/splash'),
	Blog = require('views/blog'),
	Contact = require('views/contact'),
	Portfolio = require('views/portfolio'),
	Navbar = require('views/navbar');


module.exports = Backbone.Marionette.Controller.extend({
  initialize: function(options) {
    this.region = options.region;
    
    //initialize main layout view
    APP.mainLayout = new Layout();
    // show layout view
    this.region.show(APP.mainLayout);
  },
  index: function() {
  	APP.mainLayout.main.show(new Splash());
  },
  contact: function() {
  	APP.mainLayout.navbar.show(new Navbar());
	APP.mainLayout.main.show(new Contact());
  },
  portfolio: function() {
  	APP.mainLayout.navbar.show(new Navbar());
  	APP.mainLayout.main.show(new Portfolio());
  },
  blog: function() {
  	APP.mainLayout.navbar.show(new Navbar());
  	APP.mainLayout.main.show(new Blog());
  }
});

});

;require.register("initialize", function(exports, require, module) {
// initialize new application after DOM has fully loaded

var APP = window.APP = require('application');

$(function() {
    APP.start();
});

});

;require.register("router", function(exports, require, module) {
module.exports = Backbone.Marionette.AppRouter.extend({
    appRoutes: {
    	'': 'index',
    	'blog': 'blog',
    	'contact': 'contact',
    	'portfolio': 'portfolio'
    }
});

});

;require.register("views/blog/index", function(exports, require, module) {
var ItemView = Backbone.Marionette.ItemView.extend({
    template: require("./template")
});

module.exports = ItemView;

});

;require.register("views/blog/template", function(exports, require, module) {
var __templateData = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div class=\"jumbotron\">\n  <h1>blog</h1>\n  <p>...</p>\n  <p><a class=\"btn btn-primary btn-lg\" role=\"button\">Learn more</a></p>\n</div>";
  });
if (typeof define === 'function' && define.amd) {
  define([], function() {
    return __templateData;
  });
} else if (typeof module === 'object' && module && module.exports) {
  module.exports = __templateData;
} else {
  __templateData;
}
});

;require.register("views/contact/index", function(exports, require, module) {
var ItemView = Backbone.Marionette.ItemView.extend({
    template: require("./template")
});

module.exports = ItemView;

});

;require.register("views/contact/template", function(exports, require, module) {
var __templateData = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div class=\"jumbotron\">\n  <h1>contact!</h1>\n  <p>...</p>\n  <p><a class=\"btn btn-primary btn-lg\" role=\"button\">Learn more</a></p>\n</div>";
  });
if (typeof define === 'function' && define.amd) {
  define([], function() {
    return __templateData;
  });
} else if (typeof module === 'object' && module && module.exports) {
  module.exports = __templateData;
} else {
  __templateData;
}
});

;require.register("views/default/index", function(exports, require, module) {
var Layout = Backbone.Marionette.Layout.extend({
    template: require("./template"),
    regions: {
	    navbar: '#navbarRegion',
	    main: '#mainRegion',
	    footer: '#footerRegion',
	    modal: '#modalRegion'
	},
});

module.exports = Layout;

});

;require.register("views/default/template", function(exports, require, module) {
var __templateData = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<!-- static top navbar -->\n<div class=\"navbar navbar-inverse navbar-static-top\" role=\"navigation\">\n  <!-- rendering region for navbar views -->\n  <div class=\"container\" id=\"navbarRegion\">\n    <a href=\"\" class=\"navbar-brand\">BitWise Web Design</a>\n\n  </div>\n</div>\n\n<div id=\"mainWrap\">\n  <!-- main container and rendering region -->\n  <div id=\"mainRegion\" class=\"container\">\n  \n  </div>\n\n</div>\n\n<!-- footer with rendering region -->\n<footer class=\"footer\">\n  <div id=\"footerRegion\" class=\"container\">\n    \n  </div>\n</footer>\n\n<!-- modal with rendering region -->\n<div id=\"oneModal\" class=\"modal fade\">\n  <div class=\"modal-dialog\">\n  <div id=\"modalRegion\" class=\"modal-content\">\n      <div class=\"modal-header\">\n        <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\">&times;</button>\n        <h4 class=\"modal-title\">One Modal</h4>\n      </div>\n      <div class=\"modal-body\">\n        <p>to bind them all!&hellip;</p>\n      </div>\n      <div class=\"modal-footer\">\n        <button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">Close</button>\n        <button type=\"button\" class=\"btn btn-primary\">Save changes</button>\n      </div>\n    </div><!-- /.modal-content -->\n  </div><!-- /.modal-dialog -->\n</div><!-- /.modal -->\n";
  });
if (typeof define === 'function' && define.amd) {
  define([], function() {
    return __templateData;
  });
} else if (typeof module === 'object' && module && module.exports) {
  module.exports = __templateData;
} else {
  __templateData;
}
});

;require.register("views/navbar/index", function(exports, require, module) {
var ItemView = Backbone.Marionette.ItemView.extend({
    template: require("./template")
});

module.exports = ItemView;
var ItemView = Backbone.Marionette.ItemView.extend({
    template: require("./template")
});

module.exports = ItemView;

});

;require.register("views/navbar/template", function(exports, require, module) {
var __templateData = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<a href=\"\" class=\"navbar-brand\">BitWise Web Design</a>";
  });
if (typeof define === 'function' && define.amd) {
  define([], function() {
    return __templateData;
  });
} else if (typeof module === 'object' && module && module.exports) {
  module.exports = __templateData;
} else {
  __templateData;
}
});

;require.register("views/portfolio/index", function(exports, require, module) {
var ItemView = Backbone.Marionette.ItemView.extend({
    template: require("./template")
});

module.exports = ItemView;

});

;require.register("views/portfolio/template", function(exports, require, module) {
var __templateData = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div class=\"jumbotron\">\n  <h1>portfoloio!</h1>\n  <p>...</p>\n  <p><a class=\"btn btn-primary btn-lg\" role=\"button\">Learn more</a></p>\n</div>";
  });
if (typeof define === 'function' && define.amd) {
  define([], function() {
    return __templateData;
  });
} else if (typeof module === 'object' && module && module.exports) {
  module.exports = __templateData;
} else {
  __templateData;
}
});

;require.register("views/splash/index", function(exports, require, module) {
var ItemView = Backbone.Marionette.ItemView.extend({
    template: require("./template")
});

module.exports = ItemView;

});

;require.register("views/splash/template", function(exports, require, module) {
var __templateData = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div class=\"jumbotron\">\n  <h1>Hello, world!</h1>\n  <p>...</p>\n  <p><a class=\"btn btn-primary btn-lg\" role=\"button\">Learn more</a></p>\n</div>";
  });
if (typeof define === 'function' && define.amd) {
  define([], function() {
    return __templateData;
  });
} else if (typeof module === 'object' && module && module.exports) {
  module.exports = __templateData;
} else {
  __templateData;
}
});

;
//# sourceMappingURL=main.js.map