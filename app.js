var express = require("express");

var session = require('express-session');
var MongoDBStore = require('connect-mongodb-session')(session);

var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');
var mongoose = require('mongoose');
mongoose.set('debug', true);
var path = require('path');
var favicon = require('serve-favicon');
var bcrypt=require('bcrypt-nodejs'); 
var Models = require('./public/javascripts/models.js');
var db=Models.db;
var User=Models.USchema;
var UserFB=Models.UFBSchema;
//var config=require('./public/javascripts/config.js');

var options = {
    server: {  
		  },
		 useMongoClient: true,
   
	 
};
mongoose.Promise = global.Promise;
mongoose.connect(db, options, function(err, db) {
    if (err) {
        console.log('Unable to connect to the server. Please start the server. Error:', err);
    } else {
        console.log('Connected to Server successfully!');
    }
});

var conn = mongoose.connection;

conn.on('error', console.error.bind(console, 'connection error:'));


var helmet = require('helmet');
 
var cookieParser = require('cookie-parser');
var bodyParser= require('body-parser');

var index = require('./routes/index');
var mdb = require('./routes/mdb');
var users = require('./routes/users');

var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy
  ,FacebookStrategy=require('passport-facebook').Strategy;
 
var port = process.env.PORT || 3000;

var index = require('./routes/index');
var mdb = require('./routes/mdb');
var users = require('./routes/users');
var store = new MongoDBStore(
      {
        uri: db,
        collection: 'sessions'
      });
 
    // Catch errors 
    store.on('error', function(error) {
      assert.ifError(error);
      assert.ok(false);
    });
 


passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ username: username }, function (err, user) {
	var hash = bcrypt.hashSync(password);
      if (err) { console.log(err);return done(err); }
      if (!user) { console.log('no user!');return done(null, false); }
	 if (!user.verifyPassword (password)) {
		console.log('wrong password!!');
        return done(null, false);
      }
      return done(null, user);
    });
  }
));

passport.use(new FacebookStrategy({
    clientID: 1743834388973681,
    clientSecret:'ba64850dff9cc099a736cca35960e611',
    callbackURL: '/login'
  },
  function(accessToken, refreshToken, profile, done) {
    UserFB.findOne({ facebookId: profile.id }, function (err, user) {
	    if (err) { console.log(err);return done(err); }
      if (!user) { console.log('no user!');return done(null, false); }//create user!!!!!!!!!!!
	  
      return done(err, user);
    });
  }
));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});
//remove password from object!!!!
passport.deserializeUser(function(id, done) {
   User.findById(id,function(err, user) {
     done(err, user);
   });
 });
 
var app = express();



app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(helmet());
app.use('/public', express.static(__dirname + '/public'));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(cookieParser());

 app.use(require('express-session')({
      secret: 'This is a S3CR3T',
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week 
      },
      store: store,
      // Boilerplate options, see: 
      // * https://www.npmjs.com/package/express-session#resave 
      // * https://www.npmjs.com/package/express-session#saveuninitialized 
      resave: true,
      saveUninitialized: true
    }));

app.use(passport.initialize());
app.use(passport.session()); 


app.use(users);
app.use(index);
app.use(mdb);

app.listen(port);


