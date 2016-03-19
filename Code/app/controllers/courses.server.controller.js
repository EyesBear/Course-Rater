var Course = require('mongoose').model('Course')
var Rating = require('mongoose').model('Rating')

var NUMBER_OF_RATING_FIELDS = 6

exports.renderCreate = function(req, res, next) {
	res.render('create')
}

exports.Create = function(req, res, next) {

    console.log(req.body)
    Course.create({
        code : req.body.code,
        name : req.body.name,
        instructor : req.body.instructor,
        school: req.body.school
    }, function(err, data) {
        if (err)
            res.send(err);

        res.sendStatus(200)
        
    });

}

exports.search = function(req, res, next) {
	Course.find().lean().exec(function(err, courses) {
	  	if (err) throw err;
        Rating.find().lean().exec(function(err2, ratings) {
            if (err2) throw err2;
            
            req.session.lastVisit = new Date();
            
            res.json({courses: courses,ratings: ratings,id: req.user ? req.user._id : ''});
        });
	});
}

exports.vote = function(req, res, next) {
    console.log("body is: ",req.body.flag);

    if (req.body.init == true){
        if (req.body.flag == 'up'){
        val = 1;
        push = "comment.upvoted";
        pull = "comment.downvoted";
        Rating.findOneAndUpdate({ _id: req.body.id }, { $inc: { "comment.upvotes" : val },  $push: {"comment.upvoted" : req.user._id}})
          .exec(function(err, db_res) { 
            if (err) { console.log("32");
              throw err; 
            } 
            else { console.log("3");
              console.log(db_res); 
            } 
        }); 
        } else{
            val = -1;
            push = "comment.downvoted";
            pull = "comment.upvoted";
            Rating.findOneAndUpdate({ _id: req.body.id }, { $inc: { "comment.upvotes" : val },  $push: {"comment.downvoted" : req.user._id}})
                  .exec(function(err, db_res) { 
                    if (err) { console.log("212233");
                      throw err; 
                    } 
                    else { console.log("11113");
                      console.log(db_res); 
                    } 
                }); 
        };
    } else{
        if (req.body.flag == 'up'){
            val = 1;
            push = "comment.upvoted";
            pull = "comment.downvoted";
            Rating.findOneAndUpdate({ _id: req.body.id }, { $inc: { "comment.upvotes" : val }, $pull: {"comment.downvoted" : req.user._id}, $push: {"comment.upvoted" : req.user._id}})
              .exec(function(err, db_res) { 
                if (err) { console.log("3888888");
                  throw err; 
                } 
                else { console.log("22313");
                  console.log(db_res); 
                } 
        }); 
        } else{
            val = -1;
            push = "comment.downvoted";
            pull = "comment.upvoted";
            Rating.findOneAndUpdate({ _id: req.body.id }, { $inc: { "comment.upvotes" : val }, $pull: {"comment.upvoted" : req.user._id}, $push: {"comment.downvoted" : req.user._id}})
                  .exec(function(err, db_res) { 
                    if (err) { 
                      throw err; 
                    } 
                    else { 
                      console.log(db_res); 
                    } 
                }); 
        };
    }
    res.send('Comment vote success!');
}

exports.renderRate = function(req, res, next) {
	res.render('rate');
}

exports.renderDisplay = function(req, res, next) {
	res.render('display', {userFullName: req.user ? req.user.username : ''});
}

exports.renderSchool = function(req, res, next) {
	var school = req.param('school');
	console.log(school)
	if(school){
		Course.find({school: school}, function(err, courses){
			if (err){
				throw err;
			}
			if (courses.length == 0){
				res.render('school', {school: "School Not Found", courses: []})
			}else{
				courses.forEach(function(x){
					x.rating = ((x.difficulty ? 6 - x.difficulty : 0) + (x.writing ? 6 - x.writing : 0 )
					+ (x.interest || 0) + (x.reading ? 6 - x.reading : 0) + 
					(x.time ? 6 - x.time : 0) + (x.workload ? 6 - x.workload : 0)) / NUMBER_OF_RATING_FIELDS
				})

				var coursesMapped = courses.map(function(x){
					return {name: x.code, rating: x.rating}
				})
				console.log(coursesMapped)
				res.render('school', {school: school, courses: coursesMapped, userFullName: req.user ? req.user.username : ''});
			}
		})
	}else{
		res.redirect('/')
	}
}

exports.Rate = function(req, res, next) {
	if (req.user) {
        //create a new rating object
        Rating.create({
            user : req.user,
            course_code : req.body.code,
            value : req.body.rating,
            comment : req.body.comment
        }, function(err, rating_data) {
            if (err)
                res.send(err);
            console.log('raitn date is: ', rating_data);
	 		//calculate avgs
			Rating.aggregate([
			    { $match: { course_code: req.body.code } },
			    { $group: {
			    	_id: null,
			        testAvg: { $avg: '$value.test'},
			        difficultyAvg: { $avg: '$value.difficulty'},
			        writingAvg: { $avg: '$value.writing'},
			        interestAvg: { $avg: '$value.interest'},
			        readingAvg: { $avg: '$value.reading'},
			        timeAvg: { $avg: '$value.time'},
			        workloadAvg: { $avg: '$value.workload'},

			    }}
			], function (err2, results) {
			    if (err2) {
			        console.error(err2);
			    } else {
                    console.log('NOWWWWW raitn date is: ', rating_data);
			    	//update avgs for the course
					Course.update({ code: req.body.code }, { 
						$set: { 
							difficulty: results[0].difficultyAvg,
							test: results[0].testAvg,
							writing: results[0].writingAvg,
							reading: results[0].readingAvg,
							workload: results[0].workloadAvg,
							time: results[0].timeAvg,
							interest: results[0].interestAvg,
						},
						$push:{
							comments: rating_data
						}}, function (err3, data) {
							  if (err3) return console.log(err3);
							  res.sendStatus(200)
							});
			    }
			});
        });
	} else {
		res.status(500).send('Signin required');
	}
}


