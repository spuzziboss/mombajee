(function(){//closure syntax

var app = angular.module("App", []);
app.controller("sendMail", function ($scope, $http) {

$scope.send=function(){
	
console.log('plugged in');	
};

	
});


})();