"use strict";
var sap = angular.module("sapApp.controllers", []);

sap.controller("loginCtrl", function($scope, $location) {

	$scope.login = {}
	$scope.login.sessionActive = false;
		
	$scope.doLogin = function(){
		$scope.login.sessionActive = true;
		$location.path("/customer");
		console.log("Redirecting..");
	}
	
});