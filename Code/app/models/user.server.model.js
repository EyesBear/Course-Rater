var mongoose = require('mongoose'),
	crypto = require('crypto'),
	Schema = mongoose.Schema

var UserSchema = new Schema({ 
	email: {
		type: String,
		unique: true, 
		match: [/.+\@.+..+/, "Please fill a valid e-mail address"]
	},
	username: {
		type: String,
		trim: true
	},
	password: String,
	salt: String,
	created: {
		type: Date,
		default: Date.now
	},

	ratings: [{type: Schema.Types.ObjectId, ref: 'Rating'}],
	comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}],

	schoolPref: String,

	profile: {
		gender: { type: String, default: '' },
		location: { type: String, default: '' },
		website: { type: String, default: '' },
		picture: { type: String, default: 'https://avatars0.githubusercontent.com/u/1778086?v=3&s=400' }
	},

	facebook: String,
	twitter: String,
	google: String,
	github: String,
	linkedin: String,
	instagram: String,
	tokens: Array
})



UserSchema.pre('save', function(next) {
	if (this.password) {
		this.salt = new Buffer(crypto.randomBytes(16).toString('base64'), 'base64')
		this.password = this.hashPassword(this.password)
	}
	next()
})

UserSchema.methods.hashPassword = function(password) {
	return crypto.pbkdf2Sync(password, this.salt, 10000,
		64).toString('base64')
}

UserSchema.methods.authenticate = function(password) {
	return this.password === this.hashPassword(password)
}


UserSchema.set('toJSON', {
	getters: true,
	virtuals: true
})

module.exports = mongoose.model('User', UserSchema)
