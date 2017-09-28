// JavaScript Document
 var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');
var mongoose = require('mongoose');

var TodoSchema = new mongoose.Schema({
  content: String,
  date:Date,
  author:String,
  description:String,
  name:String,
  img:String,
 
});

mongoose.connect('mongodb://localhost/mombajee');//where mombajee is database to target!!
    var Todo = mongoose.model('posts', TodoSchema);
    var todo=new Todo(
	{
		
    "content" : "blah blah blah",
    "date" :Date(),
    "author" : "Gorgon",
    "description" : "Why are some nurses are unpaid for months?",
    "name" : "Mental nurses on dem last $20",
    "img" : "public/images/stock images/nathalie/13743619_1597412587225962_1157348179_n.jpg"
		
		}
	);
	todo.save(function(err){
	if(err){console.log(err);}
	else{console.log(todo);}	
	});
