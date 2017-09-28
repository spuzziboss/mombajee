

var express = require("express");
var app     = express(),
    session = require('express-session');
  var MongoDBStore = require('connect-mongodb-session')(session);
  
   var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');
var mongoose = require('mongoose');
mongoose.set('debug', true);



//ObjectID.isValid()

var options = {
    server: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 }, auto_reconnect: true,
         reconnectTries: Number.MAX_VALUE,
         reconnectInterval: 1000 },
    replset: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } },
	 
};

var Models = require('./public/javascripts/models.js');
var db=Models.db;


mongoose.connect(db, options);

var conn = mongoose.connection;

conn.on('error', console.error.bind(console, 'connection error:'));
 
 
 var path = require('path');
 var helmet = require('helmet');
 app.use(helmet());
 

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
  
  


var cookieParser = require('cookie-parser');
var bodyParser= require('body-parser');
app.use('/public', express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/static'));

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));


 
 

var index = require('./routes/index');
var mdb = require('./routes/mdb');
var users = require('./routes/users');
app.use(cookieParser());

app.use(users);
app.use(index);

app.use(mdb);








 




var favicon = require('serve-favicon');
app.use(favicon(__dirname + '/public/images/favicon.ico'));



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');



var port = process.env.port || 3000;

app.listen(port);

 



/*
//console.log("Running at Port 3000");




/*var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
*/