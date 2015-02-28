angular
	.module("SelmaApp", ['firebase'])
	.controller("patchController", ['$scope', '$firebase', function($scope, $firebase){
			var squares = $firebase(new Firebase("https://selmaandwang.firebaseio.com/patches/squares")).$asArray();

			squares.$loaded().then(function(){
				console.log("loaded record: ", squares);
			})

  		// patches.$bindTo($scope, 'patches');
  		// console.log("patches: " + patches);


  		$scope.addSquareColor = addSquareColor;
  		$scope.squares = [{topColor: "", rightColor: ""}, {topColor: "", rightColor: ""}, {topColor: "", rightColor: ""},
								{topColor: "", rightColor: ""}, {topColor: "", rightColor: ""}, {topColor: "", rightColor: ""}]

  	// Adds color to half of the square. Adds color to each half before increasing the count to the next integer
	  function addSquareColor(color){
	    var clickCountString = Math.floor(clickCount).toString();
	    if (clickCount % 1 == 0.5){
	      $('#answer-square-' + clickCountString).css({"borderRightColor": color});
	      $scope.squares[Math.floor(clickCount)].rightColor = color;
	      console.log(clickCount);
	        if (clickCount >= 5.5){
	          $('#save').removeClass('hidden');
	          console.log($scope.squares);
	        }
	    } else if (clickCount % 1 == 0){
	      $('#answer-square-' + clickCountString).css({"borderTopColor": color});
	      $scope.squares[Math.floor(clickCount)].topColor = color;
	      console.log(clickCount);
	    }


	  }








	}]);
