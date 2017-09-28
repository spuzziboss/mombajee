// JavaScript Document

(function(){//closure syntax

			var app = angular.module("Userapp", []);
			
			app.controller("TabController", function ($scope, $http){
				
												$scope.tab = 1;
							
								$scope.setTab = function(newTab){
								  $scope.tab = newTab;
								  //console.log($scope.tab);
								};
							
								$scope.isSet = function(tabNum){
								  return $scope.tab === tabNum;
								};
				
				
			});



})();