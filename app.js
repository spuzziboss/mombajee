

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


app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));


 
 

var index = require('./routes/index');
var mdb = require('./routes/mdb');
var users = require('./routes/users');
app.use(cookieParser());

app.use(users);
app.use(index);

app.use(mdb);








 


app.use(express.static(path.join(__dirname, 'public')));

var favicon = require('serve-favicon');
app.use(favicon(path.join(__dirname, 'public/images/', 'favicon.ico')));





app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');



var port = process.env.PORT || 3000;

app.listen(port);

 

