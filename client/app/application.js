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
