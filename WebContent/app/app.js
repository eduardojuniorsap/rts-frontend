var sap = angular.module('sapApp', ['ngRoute', 'ui.bootstrap', 'sapApp.controllers']);

sap.config(['$routeProvider', '$controllerProvider', function($routeProvider, $controllerProvider){

    'use strict';

    //Necessário para carregar dinamicamente os controllers dentro de cada view
    sap.registerCtrl = $controllerProvider.register;

    $routeProvider.when("/", {templateUrl: "views/login.html"});
    $routeProvider.when("/login", {templateUrl: "views/login.html"});
    $routeProvider.when("/customer", {templateUrl: "views/customer.html"});
    $routeProvider.when("/admin", {templateUrl: "views/admin.html"});
    $routeProvider.when("/main", {templateUrl: "views/main.html"});

    $routeProvider.otherwise({redirectTo: "/"});

}]);

sap.controller('SapController', function($scope, $http, $location) {
	
	$scope.login = {}
	
	$scope.getSessionUser = function(){
		
        $http.get("LoggedUserServlet")
        .then (
          function(obj) {
        	  data = obj.data;
        	  console.log(data);
        	  $scope.login = data;
        	  $scope.login.user = data.id;
        	  $scope.login.is_customer = false;
        	  $scope.login.is_engineer = false;
        	  
        	  if (data) {
        		  
        		  if (data.access_type == "customer") {
        			  $scope.login.is_customer = true;
        		  }
        		  
        		  if (data.access_type == "engineer") {
        			  $scope.login.is_engineer = true;
        		  }
        		  
        		  $location.path("/main");
        	  }
          }
        );
        
        $scope.getEngineers();
        $scope.postEngineer();
		
	}
	
	$scope.getEngineers = function() {
				
        $http.get("ProxyServlet")
        .then (
          function(data) {
        	  console.log(data);
          }
        );
	}
	
	$scope.postEngineer = function() {
		
        $http.post("ProxyServlet", {email:'eduardo.junior@sap.com'})
        .then (
          function(data) {
        	  console.log(data);
          }
        );
	}	
		
});