
var express = require('express');
var mdb = express.Router();
var bodyParser= require('body-parser');
var mongoose = require('mongoose');
 var path = require('path');
mongoose.set('debug', true);



var Models = require('../public/javascripts/models.js');
var Todo=Models.TSchema;


mdb.get('/api/todos', function(req,res){













	
	//console.log(quote);
Todo.find({},'date author img name pause type').sort({date:-1}).limit(6).exec(function(err,todos) {
	//console.log(todos);
	
  res.json(todos);
    
});  



	
	
});


mdb.post('/api/delete/:id', function(req, res) {

 var pid = req.params.id;     
 //console.log(pid);
 
Todo.findByIdAndRemove(pid, function (err, todo) {  
  if(err){res.status(400).json({err:err});}
  else{
    res.status(209).json({pid:pid});
		//console.log(todo);
  }
});   

    });

mdb.post('/api/pause/:id', function(req, res) {

 var pid = req.params.id;     
 //console.log(pid);

 
Todo.findById(pid,'pause', function (err, todo) {  
 // console.log(todo.pause);
  
		  var x =todo.pause;
		  var y;
		  
				  if(x===false){y=true;}
				  else if(x===true){y=false;}
				  
  			//console.log(y);
 
	  
					  Todo.findOneAndUpdate({_id: pid}, {  pause:y },  function(err, resp) {
								  var pause=resp.pause;
								  if(!err){
								   console.log(resp);
								   res.status(209).json({pause:pause});
								  }
				 
					});
				
	
	
	
});   

    });
	
mdb.post('/api/create/', function(req, res) {
	 


							var post=req.body;
							console.log(post);
							
							
							var ObjectID = require('mongodb').ObjectID;
							
							post._id = new ObjectID();
							
							var d = new Date();
							var n = d.toISOString();
							post.date=n;
							
							post.author=req.session.username;
							post.img='/public/images/stock images/'+post.img;
							
							


  	var todo=new Todo(post);
	todo.save(function(err){
	 
	if(err){
		console.log(err);
		res.render('error.pug',{x:err});}
	
 
	
	else if(!err){res.redirect('/'+post._id);}
	
	
	});
	
});
		
		
		
		
		


	
	
	
	 


mdb.post('/api/mail',function(req,res){
console.log(req.body);	

var email=req.body.email;
var message=req.body.message;
var name=req.body.name;

var nodemailer = require('nodemailer');
var xoauth2= require('xoauth2');
var smtpTransport = require('nodemailer-smtp-transport');


var transport = nodemailer.createTransport(smtpTransport({
  host: 'smtp.gmail.com',
    port: 465,
    secure: true,
  
    auth: {
        user: "osimore2016@gmail.com",
        pass: "IBria135#$"
    },
    tls: {
        rejectUnauthorized: false
    }
})
);



var mailOptions = {
    from:email,
    to: 'osimore2016@gmail.com',
    subject: 'osimore.com contact form',
    text:message,
	envelope: {
        from:email, // used as MAIL FROM: address for SMTP
        to: 'osimore2016@gmail.com' // used as RCPT TO: address for SMTP
    }
};

transport.sendMail(mailOptions, function (err) {
    if(err){
        console.log(err,'Error');
		res.redirect('/error');
    } else {
        console.log('Email Sent');
		
		
		res.redirect('/contact?email=1');

  
   
  
    }
});





});

mdb.post('/api/comments',function(req,res){
	
	//console.log(req.body);
	var id=req.body.id;
	var comment=req.body.comment;
	
	var date = new Date();
    //var date = d.toISOString();
	var author=req.session.username;


	 
 

  
	
		  
			
 
	  
					  Todo.findById({_id: id},  function(err, post) {
						  if(err){console.log(err);res.redirect('/'+id);}
									   else if(!err) {
						post.comments.push({ comment:comment,date:date,author:author });
						post.save(function () {
													 
												console.log(post,'tried to save');
												
												res.redirect('/'+id); 
												
											     
						});
									   
				}
	});
				
	
	
	
   
	
	
	
	
	});
	
	
mdb.post('/api/comments/delete',function(req,res){	
//console.log('mdb comments delete reached!!!',req.body);
var inx = Number(req.body.index);
var pid = req.body.id;




								Todo.findOne({_id: pid}, function (err, post) {
									 
														  if (!err) {
															post.comments=post.comments.reverse();//must be reverse because the comments are reversed by dat by  
															post.comments=Array.from(post.comments);
															post.comments.splice(inx, 1);
															post.comments=post.comments.reverse();
															
															
															
															post.save(function () {
																											 
																										//console.log(post,'tried to save');
																										var resobj={'removed':1};
																										res.json(resobj); 
																										
																										
																										
																										 
																				});
														  }
														  else if(err){console.log(err);}
																										
																				
								});
											 

});

	
mdb.post('/api/search',function(req,res){
// later may do query on name if no resuls query on description	
//for bimbus may do categories, tags , the description	
	
	console.log(req.body);
	var q=req.body.query;
	var query={ "name" : { $regex:q,$options: 'i'} };
	
		
	 
	  //var startTime = Date.now();
	Todo.find(query,'date author description img name').sort({date:-1}).exec( function (err, result) 
   {
             if (err) { mongoose.connection.close();console.log(err); res.render('error.pug',{x:err});}
			 else {
             //console.log( result.length);
			 // console.log('Finished after ' + (Date.now() - startTime) + 'ms');
			 
			 res.render('search.pug', {
   
   
							   q:result,
							   r:result.length
							   
							   
 				 });
			 }
			
});
	
	
	});
module.exports = mdb;

var express = require('express');
var mdb = express.Router();
var bodyParser= require('body-parser');
var mongoose = require('mongoose');
mongoose.set('debug', true);



var Models = require('../public/javascripts/models.js');
var Todo=Models.TSchema;


mdb.get('/api/todos', function(req,res){













	
	//console.log(quote);
Todo.find({},'date author img name pause type').sort({date:-1}).limit(6).exec(function(err,todos) {
	//console.log(todos);
	
  res.json(todos);
    
});  



	
	
});


mdb.post('/api/delete/:id', function(req, res) {

 var pid = req.params.id;     
 //console.log(pid);
 
Todo.findByIdAndRemove(pid, function (err, todo) {  
  if(err){res.status(400).json({err:err});}
  else{
    res.status(209).json({pid:pid});
		//console.log(todo);
  }
});   

    });

mdb.post('/api/pause/:id', function(req, res) {

 var pid = req.params.id;     
 //console.log(pid);

 
Todo.findById(pid,'pause', function (err, todo) {  
 // console.log(todo.pause);
  
		  var x =todo.pause;
		  var y;
		  
				  if(x===false){y=true;}
				  else if(x===true){y=false;}
				  
  			//console.log(y);
 
	  
					  Todo.findOneAndUpdate({_id: pid}, {  pause:y },  function(err, resp) {
								  var pause=resp.pause;
								  if(!err){
								   console.log(resp);
								   res.status(209).json({pause:pause});
								  }
				 
					});
				
	
	
	
});   

    });
	
mdb.post('/api/create/', function(req, res) {
	 


							var post=req.body;
							console.log(post);
							
							
							var ObjectID = require('mongodb').ObjectID;
							
							post._id = new ObjectID();
							
							var d = new Date();
							var n = d.toISOString();
							post.date=n;
							
							post.author=req.session.username;
							post.img='/public/images/stock images/'+post.img;
							
							


  	var todo=new Todo(post);
	todo.save(function(err){
	 
	if(err){
		console.log(err);
		res.render('error.pug',{x:err});}
	
 
	
	else if(!err){res.redirect('/'+post._id);}
	
	
	});
	
});
		
		
		
		
		


	
	
	
	 


mdb.post('/api/mail',function(req,res){
console.log(req.body);	

var email=req.body.email;
var message=req.body.message;
var name=req.body.name;

var nodemailer = require('nodemailer');
var xoauth2= require('xoauth2');
var smtpTransport = require('nodemailer-smtp-transport');


var transport = nodemailer.createTransport(smtpTransport({
  host: 'smtp.gmail.com',
    port: 465,
    secure: true,
  
    auth: {
        user: "osimore2016@gmail.com",
        pass: "IBria135#$"
    },
    tls: {
        rejectUnauthorized: false
    }
})
);



var mailOptions = {
    from:email,
    to: 'osimore2016@gmail.com',
    subject: 'osimore.com contact form',
    text:message,
	envelope: {
        from:email, // used as MAIL FROM: address for SMTP
        to: 'osimore2016@gmail.com' // used as RCPT TO: address for SMTP
    }
};

transport.sendMail(mailOptions, function (err) {
    if(err){
        console.log(err,'Error');
		res.redirect('/error');
    } else {
        console.log('Email Sent');
		res.redirect('/contact');
    }
});





});

mdb.post('/api/comments',function(req,res){
	
	//console.log(req.body);
	var id=req.body.id;
	var comment=req.body.comment;
	
	var date = new Date();
    //var date = d.toISOString();
	var author=req.session.username;


	 
 

  
	
		  
			
 
	  
					  Todo.findById({_id: id},  function(err, post) {
						  if(err){console.log(err);res.redirect('/'+id);}
									   else if(!err) {
						post.comments.push({ comment:comment,date:date,author:author });
						post.save(function () {
													 
												console.log(post,'tried to save');
												
												res.redirect('/'+id); 
												
											     
						});
									   
				}
	});
				
	
	
	
   
	
	
	
	
	});
	
	
mdb.post('/api/comments/delete',function(req,res){	
//console.log('mdb comments delete reached!!!',req.body);
var inx = Number(req.body.index);
var pid = req.body.id;




								Todo.findOne({_id: pid}, function (err, post) {
									 
														  if (!err) {
															post.comments=post.comments.reverse();//must be reverse because the comments are reversed by dat by  
															post.comments=Array.from(post.comments);
															post.comments.splice(inx, 1);
															post.comments=post.comments.reverse();
															
															
															
															post.save(function () {
																											 
																										//console.log(post,'tried to save');
																										var resobj={'removed':1};
																										res.json(resobj); 
																										
																										
																										
																										 
																				});
														  }
														  else if(err){console.log(err);}
																										
																				
								});
											 

});

	
mdb.post('/api/search',function(req,res){
// later may do query on name if no resuls query on description	
//for bimbus may do categories, tags , the description	
	
	console.log(req.body);
	var q=req.body.query;
	var query={ "name" : { $regex:q,$options: 'i'} };
	
		
	 
	  //var startTime = Date.now();
	Todo.find(query,'date author description img name').sort({date:-1}).exec( function (err, result) 
   {
             if (err) { mongoose.connection.close();console.log(err); res.render('error.pug',{x:err});}
			 else {
             //console.log( result.length);
			 // console.log('Finished after ' + (Date.now() - startTime) + 'ms');
			 
			 res.render('search.pug', {
   
   
							   q:result,
							   r:result.length
							   
							   
 				 });
			 }
			
});
	
	
	});
module.exports = mdb;

