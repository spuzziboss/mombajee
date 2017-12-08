var express = require('express');
var users = express.Router();
var bodyParser= require('body-parser');
var mongoose = require('mongoose');
 var path = require('path');
mongoose.set('debug', true);

 var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;
  

  



var Models = require('../public/javascripts/models.js');
var User=Models.USchema;

 




/* https://github.com/passport/express-4.x-local-example/blob/master/server.js*/
users.get('/login',
  function(req, res){
    res.render('login');
  });
  
  
users.post('/login', 
  passport.authenticate('local', { failureRedirect: '/login' }),
  function(req, res) {
	   console.log(req.user);
    res.redirect('/blogger');
  });
  
  
  users.post('/loginFB',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  function(req, res) {
    console.log(req.user);
    res.redirect('/');
  });
  
  
users.get('/logout', function(req, res){
  
  
  req.session.destroy();
  req.logout();
  console.log(req.user,'should be undefined!');
  res.redirect('/');
});



module.exports = users;
