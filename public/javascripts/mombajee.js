(function(){//closure syntax
var app = angular.module("myApp", ["ngRoute"]);

app.config(function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl :"public/partials/postman.html",
		controller : "getpost"
		
    })
    .when("/posts", {
           templateUrl :"public/partials/postman.html",
		   controller : "getpost"
    })
    .when("/writer", {
         templateUrl :"public/partials/writer.html",
		   controller : "writer"
    }) .when("/users", {
         templateUrl :"public/partials/user.html",
		   controller : "users"
    });
    
});

app.controller("getpost", function ($scope, $http) {
	
	// Get the modal
var modal = document.getElementById('myModal');
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
		//console.log('dude');
    }
}




// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

var classToggle=function(z) {z.classList.toggle('panel-danger');z.classList.toggle('panel-primary');};	

$scope.x;//set by getting data-tage value in remove function() which is id!!
$scope.show=function(){

 
    $scope.x=event.target.getAttribute('data-tag');
	//console.log($scope.x,'generated by show()');
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
$scope.hide=function(){
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it

$scope.getposts=function(){
		
			 $http.get('/api/todos').then(function(res){
		  
					 
	          $scope.books =res.data;
				
			});
};


$scope.remove=function($event){


		var url='/api/delete/'+$scope.x;
		
	
		
		
		
		
			
		
		$http.post(url).then(function(response){
			console.log(response) ;
									if(response.status==209){
									
									//var z=$event.target.parentNode.parentNode;
									//removeChild(z);
									}
									else if(response.status==400){alert(response.data.err)}
		
			});		
				
				
			};
$scope.y='';	
$scope.pause=function(event){

		//console.log('x');	
		var y=event.target.id;
		var z=y.toString();
		var url='/api/pause/'+z;
		
				
																			/*
																			
																			
																			*/
																			
		 $http.post(url).then(function(resp){
	       console.log(resp.data.pause);
		   var x=resp.data.pause;
		   var z=event.target.parentNode.parentNode;
		    //console.log(z.classList);
			classToggle(z);
			
			
									
										
												
											 
										
											   
											 });

};


});

app.controller("writer", function ($scope){
$scope.writer=function(){
 
	var quill = new Quill('#editor-container', {
  modules: {
    toolbar: [
      ['bold', 'italic'],
      ['link', 'blockquote', 'code-block', 'image'],
      [{ list: 'ordered' }, { list: 'bullet' }]
    ]
  },
  placeholder: 'Let Us begin Nihilus',
  theme: 'snow'
});

 
	
};	
$scope.content='';
$scope.type='';
$scope.setContent=function(){
	
	
	if($scope.type=='article'){
				var x = document.getElementsByClassName("ql-editor")[0];
				var y=x.innerHTML;
				//y=y.toString;
				$scope.content=y;
	}
	else if($scope.type=='video'){
				
				$scope.content=document.getElementById('VideoUrl').value;
	}
	
};

//get author
/*
$scope.check = function(){
	
	

	
	var today = new Date();
    $scope.post.date=today.toISOString();
	
	if( $scope.post.type==="article"&&$scope.post.content===undefined){
	var x = document.getElementsByClassName("ql-editor")[0];
	var y=x.innerHTML;
	$scope.post.content=y;
	}

	
	$scope.post.author="Paul";//for now
	
	
	$scope.post.img='public/images/stock images/'+document.querySelector('input[type=file]').files[0].name;
console.log( $scope.post);

   $http
        .post('/api/create/',$scope.post)
        .success(function(data){
            //what to do here? it's up to you and the data you write from server.
        })
        .error(function(data){
            console.log('Error: ' + data);
        });
 
 //      $http.post('/api/create/',{post:$scope.post}).then(function() {console.log($scope.post);}).catch(function(){console.log('err');});
	

};

*/	




	
	
	
});

})();