var express = require('express');
var router = express.Router();




var Models = require('../public/javascripts/models.js');
var Todo=Models.TSchema;
var Quote=Models.QSchema;
 
 

router.get('/', function(req, res) {

 


var objreq={pause:false};
 /*
 if(req.session.site_views){
      req.session.site_views++;
     console.log("You visited this site " + req.session.site_views + " times");
	
   }else{
      req.session.site_views = 1;
      console.log("Welcome to this site for the first time!");
	  	 req.session.username='Nihilus';
   }
*/
Quote.find().count().exec(function(err,count) {
	var rand=Math.ceil((Math.random())*count)-1;
	//console.log(rand);
Quote.findOne().skip(rand).exec(function(err,quote) {
	
	console.log(quote);
Todo.find(objreq,'date author description img name').sort({date:-1}).limit(8).exec(function(err,todos) {
	//console.log(todos);
quote = JSON.parse(JSON.stringify(quote));

  res.render('index', {
   
   comments:todos,
   q:quote
   
  });
 	 
});  
});
});



});


router.get('/contact', function(req, res) {

  //console.log(req.query.email);
 if(req.query.email==='1'){
   
 res.render('contact.pug', {
   
   x:'The email has been sent',
   y:2
  });
	 
	 
	 }
else if(req.query.email!=='1'){
	   
res.render('contact.pug', {
   
   
   
  });		
}	
		
   
 



});






router.get('/blogger', function(req, res) {
	console.log('hitting blogger');
	res.render('blogger.pug', {
   
   
  
  });		
		
		



});

 



/*


	var ObjectID = require('mongodb').ObjectID;
	var x=ObjectID.isValid(req.params.mongoId);
*/
	
	
//create mongo validation function!!!!!!!!!!!

router.get('/:mongoId([0-9a-f]{24})', function(req, res) {

var pid = req.params.mongoId;
//console.log(typeof pid,pid);
//pid=pid.toObjectId();
//var objreq={'_id':pid};

console.log(req.session.site_views);




		
	
	
	Todo.findOne({'_id':pid},'date author  name  content pause type comments').exec(function(err,todos) {
	
	console.log(todos);
	
	if(err){	console.log(err);	 res.render('error.pug' );}
	
	else if(todos.pause===false){
		   
				
				if(todos.type==='article'){
				res.render('post.pug',{
						
						post:todos } );	
					
				}
				else if(todos.type==='video'){
				 res.render('video.pug',{
						
						post:todos } );		
				}
				   
	}
	
	
	else if(todos.pause===true){
		
		 res.render('error.pug' );		
			  
		
		
		
	}
	
	
	
	
	
	 
});   
   
});	

router.get('/:name', function(req, res,next) {


  
var x=req.params.name;
var authors=["Gorgon","Nihilus"];
var y=authors.includes(x);
//console.log(y);
if(y===true){
var objreq={'author':x}; 
 


// Create a schema

// Create a model based on the schema





Todo.find(objreq,'date author description img name pause').sort({date:-1}).limit(6).exec(function(err,todos) {
	//console.log(todos);
	
	
  res.render('author.pug', {
   
   comments:todos
   
  });
  
});  
}
else{res.render('error.pug');}
});	




module.exports = router;
