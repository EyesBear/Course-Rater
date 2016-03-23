var passport = require('passport'),
	LocalStrategy = require('passport-local').Strategy,
	User = require('mongoose').model('User')
	
module.exports = function() {
	passport.use(new LocalStrategy(function(username, password, done) {
		
		//allow both username and email signin
		var criteria = (username.indexOf('@') === -1) ? {username: username} : {email: username};
		User.findOne(criteria, function(err, user) {
			if (err) {
				return done(err)
			}
			
			if (!user) {
				return done(null, false, {
					message: 'Unkown user'
				})
			}
			if (!user.authenticate(password)) {
				return done(null, false, {
					message: 'Invalid password'
				})
			}
			
			return done(null, user)
		})
	}));


}
