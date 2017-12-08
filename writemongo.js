var bcrypt=require('bcrypt-nodejs'); 
var hash = bcrypt.hashSync("PAsha135#$");
 console.log(hash);
 var y = bcrypt.hashSync("PAsha135#$");
 for(var x=0;x<3001;x++){
	var hash = bcrypt.hashSync("PAsha135#$");
 //console.log(hash); 
	 var z=0;
	if(y===hash){console.log(true,hash,'This is true');break; }
	else{console.log(false,hash); } 
	 
};
 
 console.log('done!!',z);