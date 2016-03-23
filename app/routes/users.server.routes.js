var users = require('../../app/controllers/users.server.controller'),
	passport = require('passport')
	
module.exports = function(app) {
	app.route('/signup')
		.get(users.renderSignup)
		.post(users.signup)
		
	app.route('/signin')
		.get(users.renderSignin)
		.post(passport.authenticate('local', {
			successRedirect: '/',
			failureRedirect: '/signin',
			failureFlash: true
		}))
		
	app.route('/profile')
		.get(users.renderProfile)
		.post(users.changeProfileSettings)
	
	app.get('/signout', users.signout)

	app.get('/auth/facebook', passport.authenticate('facebook', {scope: ['email']}));
	app.get('/auth/facebook/callback',
  		passport.authenticate('facebook', { successRedirect: '/',
            failureRedirect: '/signin', scope: ['email'] }));

	app.get('/auth/twitter', passport.authenticate('twitter'));
	app.get('/auth/twitter/callback',
	  passport.authenticate('twitter', { successRedirect: '/',
	                                     failureRedirect: '/login' }));

	app.get('/auth/google', passport.authenticate('google',{ scope: 'profile email' }));
	app.get('/auth/google/callback',
	  passport.authenticate('google', { successRedirect: '/',
	                                    failureRedirect: '/login' }));

	app.get('/auth/github', passport.authenticate('github', { scope: [ 'user:email' ] }));
	app.get('/auth/github/callback',
		passport.authenticate('github', { failureRedirect: '/login', failureFlash: true }),
        function(req, res) {
			// Successful authentication, redirect home.
			res.redirect('/');});

    app.get('/auth/linkedin',
        passport.authenticate('linkedin'),
        function(req, res){
            console.log("????")
            // The request will be redirected to LinkedIn for authentication, so this
            // function will not be called.
        });
    app.get('/auth/linkedin/callback', passport.authenticate('linkedin', {
        successRedirect: '/',
        failureRedirect: '/login'
}       ));
    app.get('/auth/instagram', passport.authenticate('instagram'));
    app.get('/auth/instagram/callback',
        passport.authenticate('instagram', { failureRedirect: '/login' }),
        function(req, res) {
            // Successful authentication, redirect home.
            res.redirect('/');
        });

}

