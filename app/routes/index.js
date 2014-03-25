
/*
 * GET home page.
 */

exports.index = function(req, res){
  articleProvider.findAll(function (error, docs) {
		res.render('index.jade', {
			title: 'jason on the web',
			articles: docs
		});
	});
};