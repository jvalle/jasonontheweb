var Db = require('mongodb').Db;
var Connection = require('mongodb').Connection;
var Server = require('mongodb').Server;
var BSON = require('mongodb').BSON;
var ObjectID = require('mongodb').ObjectID;

UserProvider = function(host, port) {
  this.db= new Db('user-dev-db', new Server(host, port, {auto_reconnect: true}, {}), {safe: true});
  this.db.open(function(){});
};

UserProvider.prototype.auth = function (userInfo, callback) {
	if (userInfo.username === "jason"  && userInfo.password === "testpw") {
		callback(null, true);
	} else {
		callback(null, false);
	}
};

exports.UserProvider = UserProvider;