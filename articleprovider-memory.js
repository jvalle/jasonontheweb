var articleCounter = 1;

ArticleProvider = function () {};
ArticleProvider.prototype.dummyData = [];

ArticleProvider.prototype.findAll = function (callback) {
	callback(null, this.dummyData);
};

ArticleProvider.prototype.findById = function (id, callback) {
	var result = null, i;

	for (i = 0; i < this.dummyData.length; i++) {
		if (this.dummyData[i]._id === parseInt(id, 10)) {
			result = this.dummyData[i];
			break;
		}
	}
	callback(null, result);
};

ArticleProvider.prototype.save = function (articles, callback) {
	var article = null, i, j;

	if (typeof articles.length == "undefined") {
		articles = [articles];
	}

	for (i = 0; i < articles.length; i++) {
		article = articles[i];
		article._id = articleCounter++;
		article.created_at = new Date();

		if (article.comments === undefined) {
			article.comments = [];
		}

		for (j = 0; j < article.comments.length; j++) {
			article.comments[j].created_at = new Date();
		}

		this.dummyData[this.dummyData.length] = article;
	}
	callback(null, articles);
};

new ArticleProvider().save([
	{title: "Post One", body: "Body One", comments: [{author: "Bob", comment: "This is Bob's comment."}]},
	{title: "Post Two", body: "Body Two"},
	{title: "Post Three", body: "Body Three"}
], function (error, articles) {});

exports.ArticleProvider = ArticleProvider;