var express = require('express');
var routes = require('./routes');
var passport = require('passport');
var ArticleProvider = require('./articleprovider-mongodb').ArticleProvider;
// var UserProvider = require('./users/user-provider').UserProvider;

var app = module.exports = express();

app.configure(function () {
	app.set('views', __dirname + '/views');
	app.set('view engine', 'jade');
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(require('stylus').middleware({src: __dirname + '/public'}));
	app.use(app.router);
	app.use(express.static(__dirname + '/public'));
});

app.configure('development', function () {
	app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function () {
	app.use(express.errorHandler());
});

var articleProvider = new ArticleProvider('localhost', 27017);
// var userProvider = new UserProvider('localhost', 27017);

// var auth = express.basicAuth(function(user, pass) {
// 	userProvider.auth({
// 		username: user,
// 		password: pass
// 	}, function (err, result) {
// 		if (!result) {
// 			res.redirect('/');
// 		}
// 	});
// });

app.get('/', function (req, res) {
	articleProvider.findAll(function (error, docs) {
		res.render('index.jade', {
			title: 'jason on the web',
			articles: docs
		});
	});
});

// app.get('/login', function (req, res) {
// 	res.render('login.jade');
// });

// app.post('/login', function (req, res){
// 	userProvider.auth({
// 		username: req.param('username'),
// 		password: req.param('password')
// 	}, function (error, loggedIn) {
// 		if (loggedIn) {
// 			res.redirect('/blog/new');
// 		} else {
// 			res.redirect('/');
// 		}
// 	});
// });

app.get('/blog/new', 
	passport.authenticate('local'), 
	function (req, res) {
		res.render('blog_new.jade', {
			title: 'New Post'
		});
	}
);

app.post('/blog/new', function (req, res) {
	articleProvider.save({
		title: req.param('title'),
		body: req.param('body'),
		postUrl: req.param('postUrl')
	}, function (error, docs) {
		res.redirect('/');
	});
});

app.get('/blog/:postUrl', function (req, res) {
	articleProvider.findById(req.params.postUrl, function (error, article) {
		res.render('blog_article.jade',  {
			article: article
		});
	});	
});

app.get('/work', function (req, res) {
	res.render('work.jade');
});

app.listen(3000);
console.log("App.js initiated on port: " + 3000);