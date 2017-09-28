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
users.get('/login', function(req, res, next) {
console.log('hitting log in');
  res.render('login.pug', {
   
   
   
  });		
		
});

users.post('/login', function(req, res, next) {
 //console.log('was hit by log in form');	
	
 var username=req.body.username;
 var password=req.body.password;
  console.log(username,password);
 
passport.authenticate('local', { successRedirect: '/',
                                   failureRedirect: '/login',
                                   failureFlash: true });
	
		
});



module.exports = users;
