var User = require('mongoose').model('User'),
	passport = require('passport'),
	Course = require('mongoose').model('Course')

var getErrorMessage = function(err) {
	var message = ''
	
	if (err.code) {
		switch (err.code) {
			case 11000:
			case 11001:
				message = 'Email alread exsists'
				break
			default:
				message = 'Something went wrong'
		}
	} else {
		for (var errName in err.errors) {
			if (err.errors[errName].message) message = err.errors[errName].message
		}
	}
	return message
}

exports.renderProfile = function(req, res, next) {
	res.render('profile', {
		title: 'Profile',
		userFullName: req.user.username,
		userEmail: req.user.email,
		userPicture: req.user.profile.picture,
		schoolPref: req.user.schoolPref || "School"
	})
}

exports.changeProfileSettings = function(req, res, next){
	if(!req.user){
		res.writeHead(400, {"Content-Type": "application/json"})
		res.end(JSON.stringify({message: "Not logged in!"}))
		return
	}

	if(!req.body.settings){
		res.writeHead(400, {"Content-Type": "application/json"})
		res.end(JSON.stringify({message: "Empty Settings!"}))
	}else{
		console.log(req.body.settings.schoolPref)
		Course.findOne({school: req.body.settings.schoolPref}, function(err, course){
			if(err){
				throw err;
			}
			if(course){ // theres a school with this course
				User.update({email: req.user.email}, {$set : {schoolPref: req.body.settings.schoolPref}}, function(err, raw){
					if(err){
						res.writeHead(400, {"Content-Type": "application/json"})
						res.end(JSON.stringify({message: "An error occurred"}))
						throw err;
					}
					req.user.schoolPref = req.body.settings.schoolPref;
					res.writeHead(200, {"Content-Type": "application/json"})
					res.end(JSON.stringify({message: "Success!"}))
				})
			}else{
				res.writeHead(400, {"Content-Type": "application/json"})
				res.end(JSON.stringify({message: "School does not exist!"}))
			}
		})
	}
}

exports.renderSignin = function(req, res, next) {
	if (!req.user) {
		res.render('signin', {
			title: 'Sign-in Form',
			messages: req.flash('error') || req.flash('info')
		})
	} else {
		return res.redirect('/')
	}
}

exports.renderSignup = function(req, res, next) {
	if (!req.user) {
		res.render('signup', {
			title: 'Sign-up Form',
			messages: req.flash('error')
		})
	} else {
		return res.redirect('/')
	}
}

exports.signup = function(req, res, next) {
	if (!req.user) {
		var user = new User(req.body)
		console.log(req.body)
		var message = null
		
		user.save(function(err) {
			if (err) {
				var message = getErrorMessage(err)
				
				req.flash('error', message)
				return res.redirect('/signup')
			}
			req.login(user, function(err) {
				if (err) return next(err)
				return res.redirect('/')
			})
		})
	} else {
		return res.redirect('/')
	}
}

exports.signout = function(req, res) {
	req.logout()
	res.redirect('/')
}
