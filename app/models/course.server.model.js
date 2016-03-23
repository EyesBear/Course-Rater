require('./user.server.model');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var UserSchema = mongoose.model('User').schema;

var RatingSchema = new Schema({
  user: UserSchema,
  course_code: String,
  value: {
    difficulty: Number,
    workload: Number,
    interest: Number,
    reading: Number,
    time: Number,
    test: Number,
    writing: Number
  },
  comment: {
    upvotes: Number,
    content: String,
    upvoted: [{type: Schema.Types.ObjectId, ref: 'User'}],
    downvoted: [{type: Schema.Types.ObjectId, ref: 'User'}]
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

var CourseSchema = new Schema({
  code: {type: String, required: true},
  name: String,
  school: {type: String, required: true},
  instructor: String,
  comments: [RatingSchema],
  difficulty: {type: Number, default: 0},
  workload: {type: Number, default: 0},
  interest: {type: Number, default: 0},
  reading: {type: Number, default: 0},
  time: {type: Number, default: 0},
  test: {type: Number, default: 0},
  writing: {type: Number, default: 0}
});



var Course = mongoose.model('Course', CourseSchema);
var Rating = mongoose.model('Rating', RatingSchema);

module.exports = Course;
module.exports = Rating;




