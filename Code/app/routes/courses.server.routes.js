var Rating = require('mongoose').model('Rating')
var Course = require('../../app/controllers/courses.server.controller')

module.exports = function(app) {
	app.route('/create')
		.get(Course.renderCreate)
		.post(Course.Create)

	app.route('/rate')
        .get(Course.renderRate)
		.post(Course.Rate)

    app.route('/search')
        .get(Course.search)

    app.route('/display')
        .get(Course.renderDisplay)      

    app.route('/school/:school')
        .get(Course.renderSchool)

    app.route('/school')
        .get(Course.renderSchool) 

    app.route('/vote')
        .post(Course.vote) 
}
