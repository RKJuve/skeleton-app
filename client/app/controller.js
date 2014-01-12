var Layout = require('views/default'),
	Splash = require('views/splash'),
	Blog = require('views/blog'),
	Contact = require('views/contact'),
	Portfolio = require('views/portfolio');


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
