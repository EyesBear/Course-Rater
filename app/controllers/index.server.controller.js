Course = require('mongoose').model('Course');


exports.render = function(req, res) {
	Course.find().lean().exec(function(err, courses) {
	  	if (err) throw err;
	  	//console.log("and", JSON.stringify(courses));
		if (req.session.lastVist) {
			console.log(req.session.lastVisit)
		}
		
		req.session.lastVisit = new Date()
		console.log("profilename is "+req.user);
		if(req.user && req.user.schoolPref){
			res.redirect('/school/'+req.user.schoolPref)
		}
		else{
			res.render('index', {
				title: 'Rate My Course',
				userFullName: req.user ? req.user.username : '',
				userid: req.user ? req.user._id : '',
				courses: courses
			})			
		}

	  
	});
};


