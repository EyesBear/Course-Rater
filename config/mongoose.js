var config = require('./config'),
	mongoose = require('mongoose')
	
module.exports = function() {
//	var db = mongoose.connect(config.db);

	/* Establish connection to remote mongodb server */
	var url = 'mongodb://admin:admin1@ds049094.mongolab.com:49094/ratemycourse';
	var db = mongoose.connect(url);
	console.log('Connection established to', url);

	require('../app/models/course.server.model');
	require('../app/models/user.server.model');
	
	return db;
}
