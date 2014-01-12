var Layout = require('views/default');


module.exports = Backbone.Marionette.Controller.extend({
  initialize: function(options) {
    this.region = options.region;
    
    //initialize main layout view
    APP.mainLayout = new Layout();
    // show layout view
    this.region.show(APP.mainLayout);
  },
  index: function() {

  }
});
