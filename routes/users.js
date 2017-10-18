var express = require('express');
var users = express.Router();
var bodyParser= require('body-parser');
var mongoose = require('mongoose');
mongoose.set('debug', true);

var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;
  



var Models = require('../public/javascripts/models.js');
var User=Models.USchema;

 
/*

https://www.codetutorial.io/authentication-for-express-using-passportjs-part-2/

passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ username: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) {
		  console.log('incoreect username');
        return done(null, false, { message: 'Incorrect username.' });
		
      }
      if (!user.validPassword(password)) {
		    console.log('incoreect password');
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));




/* GET users listing. */
users.route('/login')
.get( function(req, res) {
console.log('hitting log in freshly');
  res.render('login.pug', {
   
   
   
  });		
		
}).post( function(req, res) {
 //console.log('was hit by log in form');	
	
 var username=req.body.username;
 var password=req.body.password;
  console.log(username,password);
 
passport.authenticate('local', { successRedirect: '/',
                                   failureRedirect: '/login',
                                   failureFlash: true });
	
		
});



module.exports = users;
