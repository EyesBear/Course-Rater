var passport = require('passport'),
	FacebookStrategy = require('passport-facebook').Strategy,
	TwitterStrategy = require('passport-twitter').Strategy,
	GoogleStrategy = require('passport-google-oauth').OAuth2Strategy,
    GitHubStrategy = require('passport-github2').Strategy,
    LinkedInStrategy = require('passport-linkedin-oauth2').Strategy,
    InstagramStrategy = require('passport-instagram').Strategy,
	User = require('mongoose').model('User'),
	randomstring = require("randomstring");

module.exports = function() {

	/**
	 * Sign in with Facebook.
	 */
	passport.use(new FacebookStrategy({
	    clientID: '166272027057110',
	    clientSecret: 'a56b12ea0fe36005dd5d0e21cc5d3016',
	    callbackURL: '/auth/facebook/callback',
	    passReqToCallback: true,
	    profileFields: ['id', 'email', 'gender', 'link', 'locale', 'name', 'timezone', 'updated_time', 'verified']
	  }, 
	  function(req, accessToken, refreshToken, profile, done) {
	  	console.log(profile)
		if (req.user) {
		    User.findOne({ facebook: profile.id }, function(err, existingUser) {
		      if (existingUser) {
		        req.flash('errors', { msg: 'There is already a Facebook account that belongs to you. Sign in with that account or delete it, then link it with your current account.' });
		        done(err);
		      } else {
		        User.findById(req.user.id, function(err, user) {
		          user.facebook = profile.id;
		          user.tokens.push({ kind: 'facebook', accessToken: accessToken });
		          user.username = user.username || profile.displayName;
		          user.profile.gender = user.profile.gender || profile._json.gender;
		          user.profile.picture = user.profile.picture || 'https://graph.facebook.com/' + profile.id + '/picture?type=large';
		          user.save(function(err) {
		            req.flash('info', { msg: 'Facebook account has been linked.' });
		            done(err, user);
		          });
		        });
		      }
		    });
		  } else {
		  	console.log("Facebook: Not logged in")
		    User.findOne({ facebook: profile.id }, function(err, existingUser) {
		      if (existingUser) return done(null, existingUser);
		      User.findOne({ email: profile._json.email }, function(err, existingEmailUser) {
		        if (existingEmailUser) {
		          req.flash('errors', { msg: 'There is already an account using this email address. Sign in to that account and link it with Facebook manually from Account Settings.' });
		          //done(err);
                  done(null, existingEmailUser);
		        } else {
		          console.log("Facebook: User not found")
		          var user = new User();
		          user.email = profile._json.email;
		          user.facebook = profile.id;
		          user.tokens.push({ kind: 'facebook', accessToken: accessToken });
		          user.username = profile._json.first_name + " " + profile._json.last_name;
		          user.profile.gender = profile._json.gender;
		          user.profile.picture = 'https://graph.facebook.com/' + profile.id + '/picture?type=large';
		          user.profile.location = (profile._json.location) ? profile._json.location.name : '';
		          user.save(function(err) {
					//duplicate username check
		            done(err, user);
		          });
		        }
		      });
		    });
		  }
	})),

	// Sign in with Twitter.

	passport.use(new TwitterStrategy({
	    consumerKey: 'gDzxiK4uxQDtMUoJsS55K8IwL',
	    consumerSecret: '7Uk6Lgg0dOBRjqosqai7Xf1xCAfiyW6vdV8BcaUZ1yAPJNFHig',
	    callbackURL: '/auth/twitter/callback',
	    passReqToCallback: true
  	}, 
  	function(req, accessToken, tokenSecret, profile, done) {
	  if (req.user) {
	    User.findOne({ twitter: profile.id }, function(err, existingUser) {
	      if (existingUser) {
	        req.flash('errors', { msg: 'There is already a Twitter account that belongs to you. Sign in with that account or delete it, then link it with your current account.' });
	        done(err);
	      } else {
	        User.findById(req.user.id, function(err, user) {
	          user.twitter = profile.id;
	          user.tokens.push({ kind: 'twitter', accessToken: accessToken, tokenSecret: tokenSecret });
	          user.username = user.username || profile.displayName;
	          user.profile.location = user.profile.location || profile._json.location;
	          user.profile.picture = user.profile.picture || profile._json.profile_image_url_https;
	          user.save(function(err) {
	            req.flash('info', { msg: 'Twitter account has been linked.' });
	            done(err, user);
	          });
	        });
	      }
	    });

	  } else {
	    User.findOne({ twitter: profile.id }, function(err, existingUser) {
	      if (existingUser) return done(null, existingUser);
	      var user = new User();
	      // Twitter will not provide an email address.  Period.
	      // But a person’s twitter username is guaranteed to be unique
	      // so we can "fake" a twitter email address as follows:
	      user.email = profile.username + "@twitter.com";
	      user.twitter = profile.id;
	      user.tokens.push({ kind: 'twitter', accessToken: accessToken, tokenSecret: tokenSecret });
	      user.username = profile.displayName;
	      user.profile.location = profile._json.location;
	      user.profile.picture = profile._json.profile_image_url_https;
	      user.save(function(err) {
			//duplicate username check
	        done(err, user);
	      });
	    });
	  }
	})),

    /**
     * Sign in with Google.
     */
    passport.use(new GoogleStrategy({
        clientID: '156750498529-h23bma35id65la1h4it1uc01jfh77m7k.apps.googleusercontent.com',
        clientSecret: '9QAVy5E8EBHjbcTXRDc29su2',
        callbackURL: '/auth/google/callback',
        passReqToCallback: true
      },
      function(req, accessToken, refreshToken, profile, done) {
        if (req.user) {
            User.findOne({ google: profile.id }, function(err, existingUser) {
              if (existingUser) {
                req.flash('errors', { msg: 'There is already a Google account that belongs to you. Sign in with that account or delete it, then link it with your current account.' });
                done(err);
              } else {
                User.findById(req.user.id, function(err, user) {
                  user.google = profile.id;
                  user.tokens.push({ kind: 'google', accessToken: accessToken });
                  user.username = user.username || profile.displayName;
                  user.profile.gender = user.profile.gender || profile._json.gender;
                  user.profile.picture = user.profile.picture || profile._json.image.url;
                  user.save(function(err) {
                    req.flash('info', { msg: 'Google account has been linked.' });
                    done(err, user);
                  });
                });
              }
            });
          } else {
            User.findOne({ google: profile.id }, function(err, existingUser) {
              if (existingUser) return done(null, existingUser);
              User.findOne({ email: profile.emails[0].value }, function(err, existingEmailUser) {
                if (existingEmailUser) {
                  req.flash('errors', { msg: 'There is already an account using this email address. Sign in to that account and link it with Google manually from Account Settings.' });
                  //done(err);
                  done(null, existingEmailUser);
                } else {
                  var user = new User();
                  user.email = profile.emails[0].value;
                  user.google = profile.id;
                  user.tokens.push({ kind: 'google', accessToken: accessToken });
                  user.username = profile.displayName;
                  user.profile.gender = profile._json.gender;
                  user.profile.picture = profile._json.image.url;
                  user.save(function(err) {
                    //duplicate username check
                    done(err, user);
                  });
                }
              });
            });
          }
        })),

    /**
    * Sign in with GitHub
    */
    passport.use(new GitHubStrategy({
            clientID: 'ed7ad64447051af2b236',
            clientSecret: '7aae110dc0a720769c93e899ad9b73d700a215d2',
            callbackURL: 'http://127.0.0.1:3000/auth/github/callback',
            passReqToCallback: true
        },
        function(req, accessToken, refreshToken, profile, done) {
            if (req.user) {
                User.findOne({ github: profile.id }, function(err, existingUser) {
                    if (existingUser) {
                        req.flash('errors', { msg: 'There is already a GitHub account that belongs to you. Sign in with that account or delete it, then link it with your current account.' });
                        done(err);
                    } else {
                        User.findById(req.user.id, function(err, user) {
                            user.github = profile.id;
                            user.tokens.push({ kind: 'github', accessToken: accessToken });
                            user.username = user.username || profile.displayName;
                            //user.profile.gender = user.profile.gender || profile._json.gender;
                            user.profile.picture = profile._json,avatar_url;
                            user.save(function(err) {
                                req.flash('info', { msg: 'GitHub account has been linked.' });
                                done(err, user);
                            });
                        });
                    }
                });
            } else {
            	console.log("Github: Not logged in")
                User.findOne({ github: profile.id }, function(err, existingUser) {
                	console.log(existingUser)
                    if (existingUser) return done(null, existingUser);
                    User.findOne({ email: profile.emails[0].value }, function(err, existingEmailUser) {
                        if (existingEmailUser) {
                        	console.log("Github: Email exists")
                            req.flash('errors', { msg: 'There is already an account using this email address. Sign in to that account and link it with Google manually from Account Settings.' });
                            //done(err);
                            done(null, existingEmailUser);
                        } else {
                            var user = new User();
                            user.email = profile.emails[0].value;
                            user.github = profile.id;
                            user.tokens.push({ kind: 'github', accessToken: accessToken });
                            user.username = profile.displayName;
                            //user.profile.gender = profile._json.gender;
                            user.profile.picture = profile._json.avatar_url;
                            user.save(function(err) {
                                //duplicate username check
                                done(err, user);
                            });
                        }
                    });
                });
            }
        })),

        /*
        * Sign-in with LinkedIn
         */
    passport.use(new LinkedInStrategy({
            clientID: '77misx477eql2f',
            clientSecret: 'b7AP8v2RC1BofZ5E',
            callbackURL: '/auth/linkedin/callback',
            passReqToCallback: true,
            scope: ['r_emailaddress', 'r_basicprofile'],
            state: true
        },
        function(req, accessToken, refreshToken, profile, done) {
            console.log("?????")
            if (req.user) {
                console.log("LinkedIn: I am logged in ???")
                User.findOne({ linkedin: profile.id }, function(err, existingUser) {
                    if (existingUser) {
                        req.flash('errors', { msg: 'There is already an LinkedIn account that belongs to you. Sign in with that account or delete it, then link it with your current account.' });
                        done(err);
                    } else {
                        User.findById(req.user.id, function(err, user) {
                            user.linkedin = profile.id;
                            user.tokens.push({ kind: 'linkedin', accessToken: accessToken });
                            user.username = user.username || profile.displayName;
                            //user.profile.gender = user.profile.gender || profile._json.gender;
                            //user.profile.picture = user.profile.picture || profile._json.image.url;
                            user.save(function(err) {
                                req.flash('info', { msg: 'LinkedIn account has been linked.' });
                                done(err, user);
                            });
                        });
                    }
                });
            } else {
                console.log(profile)
                User.findOne({ linkedin: profile.id }, function(err, existingUser) {
                    if (existingUser) return done(null, existingUser);
                    User.findOne({ email: profile.emails[0].value }, function(err, existingEmailUser) {
                        if (existingEmailUser) {
                            console.log("Already Signed In")
                            req.flash('errors', { msg: 'There is already an account using this email address. Sign in to that account and link it with Google manually from Account Settings.' });
                            //done(err);
                            done(null, existingEmailUser);
                        } else {
                            var user = new User();
                            user.email = profile.emails[0].value;
                            user.linkedin = profile.id;
                            user.tokens.push({ kind: 'linkedin', accessToken: accessToken });
                            user.username = profile.displayName;
                            //user.profile.gender = profile._json.gender;
                            //user.profile.picture = profile._json.image.url;
                            user.save(function(err) {
                                //duplicate username check
                                done(err, user);
                            });
                        }
                    });
                });
            }
        })),

    /*
    * Sign-in with Instagram
     */
    passport.use(new InstagramStrategy({
            clientID: '2f0d6582441442659e0468f7b2e0b0bd',
            clientSecret: '26013a3c6b274dc7b7819e3aeab561f0',
            callbackURL: 'http://127.0.0.1:3000/auth/instagram/callback',
            passReqToCallback: true
        },
        function(req, accessToken, refreshToken, profile, done) {
            if (req.user) {
                User.findOne({ instagram: profile.id }, function(err, existingUser) {
                    if (existingUser) {
                        req.flash('errors', { msg: 'There is already an Instagram account that belongs to you. Sign in with that account or delete it, then link it with your current account.' });
                        done(err);
                    } else {
                        User.findById(req.user.id, function(err, user) {
                            user.instagram = profile.id;
                            user.tokens.push({ kind: 'instagram', accessToken: accessToken });
                            user.username = user.username || profile.displayName;
                            //user.profile.gender = user.profile.gender || profile._json.gender;
                            user.profile.picture = user.profile.picture;
                            user.save(function(err) {
                                req.flash('info', { msg: 'Facebook account has been linked.' });
                                done(err, user);
                            });
                        });
                    }
                });
            } else {
                console.log("LinkedIn: Not logged in");
                User.findOne({ instagram: profile.id }, function(err, existingUser) {
                    if (existingUser) return done(null, existingUser);
                    User.findOne({ email: profile._json.email }, function(err, existingEmailUser) {
                        console.log(existingUser)
                        if (existingEmailUser) {
                            req.flash('errors', { msg: 'There is already an account using this email address. Sign in to that account and link it with Facebook manually from Account Settings.' });
                            //done(err);
                            done(null, existingEmailUser);
                        } else {
                            var user = new User();
                            user.email = profile._json.email;
                            user.instagram = profile.id;
                            user.tokens.push({ kind: 'instagram', accessToken: accessToken });
                            user.username = profile.displayName;
                            //user.profile.gender = profile._json.gender;
                            user.profile.picture = profile.picture;
                            //user.profile.location = (profile._json.location) ? profile._json.location.name : '';
                            user.save(function(err) {
                                //duplicate username check
                                done(err, user);
                            });
                        }
                    });
                });
            }
        }));
}
