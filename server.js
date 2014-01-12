// bring in express and underscore
var 	path = require("path"),
 	 express = require("express"),
       	   _ = require("underscore");

// bring in mongodb stuf
var	mongo = require('mongodb'),
	monk = require('monk'),
	db = monk(process.env.MONGOHQ_URL),
	test = db.get('test');
	test.insert({'test1':'test2'});




var buildDir = './build';

//set up the express app
var app = express()
        .use(express.static(buildDir))
        .use(express.urlencoded());

app.get("/api/portfolio", function(req, res) {
	test.find({}, function(err, doc){
		if (err) {
			console.log(err);
			res.status(404);
		} else {
			res.json(doc);
		}
	});
});

// start node server
var port = process.env.PORT || 3000;
app.listen(port);
console.log("The server is now listening on port %s", port);