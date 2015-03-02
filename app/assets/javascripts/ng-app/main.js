angular
	.module("SelmaApp", ['firebase'])
	.controller("patchController", ['$scope', '$firebase', function($scope, $firebase){
			var ref = new Firebase("https://selmaandwang.firebaseio.com/patches");
			var patches = $firebase(ref).$asObject();
			patches.$bindTo($scope, 'patches');

  		$scope.addSquareColor = addSquareColor;
  		var dbsquares = [{topColor: "", rightColor: ""}, {topColor: "", rightColor: ""}, {topColor: "", rightColor: ""},
								{topColor: "", rightColor: ""}, {topColor: "", rightColor: ""}, {topColor: "", rightColor: ""}]
  		$scope.squares = [1,2,3,4,5,6];

  	// Adds color to half of the square. Adds color to each half before increasing the count to the next integer
	  function addSquareColor(color){
	  	// Rounds the clickCount to the nearest whole number, than converts it to a string for html injection
	    var clickCountString = Math.floor(clickCount).toString();
	    // Checks if clickCount is a whole number. If so, the squares top/left triangle color is set
	    if (clickCount % 1 == 0){
	      $('#answer-square-' + clickCountString).css({"borderTopColor": color});
	      dbsquares[Math.floor(clickCount)].topColor = color;
	      console.log(clickCount);
	      // Checks if clickCount end in 0.5. If so, the squares bottom/right triangle color is set 
	    } else if (clickCount % 1 == 0.5){
	      $('#answer-square-' + clickCountString).css({"borderRightColor": color});
	      dbsquares[Math.floor(clickCount)].rightColor = color;
	      console.log(clickCount);
        if (clickCount >= 5.5){
        	// Shows save button and patch once a whole patch has been created by the user
        	$('#save').removeClass('hidden');
          $('#dream-patch').removeClass('hidden');
          ref.push(dbsquares);
        }
	    }
	  }


	}]);
