
var mongoose = require('mongoose');
mongoose.set('debug', true);
var bcrypt=require('bcrypt-nodejs');


/*
String.prototype.toObjectId = function() {
  var ObjectId = (require('mongoose').Types.ObjectId);
  return new ObjectId(this.toString());
};
*/
var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;


var Comments = new Schema({
  author:String,
  date:Date,
  comment:String
 
  
});
var TodoSchema = new Schema({
  content: String,
  date:Date,
  author:String,
  description:String,
  name:String,
  img:String,
  _id:ObjectId,
  pause:Boolean,
  category:String,
  type:String,
  comments  : [Comments]
});

var quoteSchema = new Schema({
  _id:ObjectId,
  quote: String
 
  
});

var userSchema = new Schema({
  _id:ObjectId,
  username: String,
  password:String,
  LastLog:Date,
  userType:String

  
});
 userSchema.methods.verifyPassword = function(password, callback,err) {
   return bcrypt.compareSync(password, this.password);
}; 

var userFBSchema = new Schema({
  _id:ObjectId,
  facebookId:Number,
  email: String,
  name: String,
  LastLog:Date,
  user_birthday:Date,
  public_profile:[Schema.Types.Mixed],
  userType:String

  
});
var USchema = mongoose.model('admin', userSchema);
var UFBSchema = mongoose.model('users', userFBSchema,'users');

var TSchema = mongoose.model('post', TodoSchema,'posts');
var QSchema = mongoose.model('quote', quoteSchema);
//var db='mongodb://localhost/mombajee';
// note MUST CHANGE URI IN MONGO SESSIONS SNIPPET
var db='mongodb://spuzziboss:PAsha135#$@ds161630.mlab.com:61630/mombajee';


exports.USchema = USchema;
exports.UFBSchema = UFBSchema;
exports.TSchema = TSchema;
exports.QSchema = QSchema;
exports.db =db;



