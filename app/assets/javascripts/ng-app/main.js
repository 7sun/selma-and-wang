angular
	.module("SelmaApp", ['firebase'])
	.controller("tileController", ['$scope', '$firebase', function($scope, $firebase){
		  var ref = new Firebase("https://selmaandwang.firebaseio.com/tiles");
  		var sync = $firebase(ref);

  		sync.$set({foo: "bar"});


	}]);
