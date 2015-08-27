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
	console.log($scope);
	
	$scope.login = {}
	
	$scope.getSessionUser = function(){
		
        $http.get("LoggedUserServlet")
        .then (
          function(obj) {
        	  data = obj.data;
        	  $scope.login.user = data.id;
        	  $scope.login.firstname = data.firstname;
        	  console.log(data);
        	  console.log(data.firstname);
        	  
        	  if (data) {
        		  $location.path("/main");
        	  }
          }
        );
		
	}
		
});