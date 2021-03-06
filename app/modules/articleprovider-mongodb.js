var moment = require('moment');

var mongouri = process.env.MONGO_URI || require('../../config.js').config.mongohq_uri;

var db = require('mongojs').connect(mongouri, ['articles']);

var findAll = module.exports.findAll = function (callback) {
    db.articles.find().sort({created_at: -1}).toArray(function (err, results) {
        if (err) {
            console.log('There was an error in the db.findAll ' + err);
        }

        callback(err, results);
    });
};

var saveArticle = module.exports.saveArticle = function (article, callback) {
    article.created_at = new Date();
    article.display_date = moment().format("MMMM Do, YYYY");

    db.articles.save(article, function (err, saved) {
        if (err) {
            console.log('There was an error in db.saveArticle ' + err);
        }

        callback(err, saved);
    });
};

var findOne = module.exports.findOne = function (postUrl, callback) {
    db.articles.findOne({postUrl: postUrl}, function (err, result) {
        if (err) {
            console.log('There was an error in db.findOne' + err);
        }

        callback(err, result);
    });
};