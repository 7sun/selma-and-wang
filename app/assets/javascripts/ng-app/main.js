angular
	.module("SelmaApp", ['firebase'])
	.controller("patchController", ['$scope', '$firebase', function($scope, $firebase){
			var ref = new Firebase("https://selmaandwang.firebaseio.com/patches");
			var patches = $firebase(ref).$asObject();
			patches.$bindTo($scope, 'patches');

			var counterRef = ref.child("counter");

			counterRef.once("value", function(snapshot) {
				// sets local counter to match initial Firebase counter
  			counter = snapshot.val() + 1;
  			// console.log(counter);
  			// Increases counter in Firebase by 1
  			counterRef.transaction(function(currentValue) {
			  	return (currentValue || 0) + 1;
				});

				setTransparentTriangles();
			});

  		$scope.addSquareColor = addSquareColor;
  		var dbsquares = [{topColor: "", sideColor: ""}, {topColor: "", sideColor: ""}, {topColor: "", sideColor: ""},
								{topColor: "", sideColor: ""}, {topColor: "", sideColor: ""}, {topColor: "", sideColor: ""}]
  		$scope.squares = [1,2,3,4,5,6];

  		function between(x, min, max){
  			return x >= min && x <= max;
  		}

  		var inverse;
  		

  		function setTransparentTriangles(){
  			console.log("outside func counter val: " + counter);
	    	if ( between(counter, 1, 3) || between(counter, 7, 9) || between(counter, 16, 18) || between(counter, 22, 24) ){
	    		$('#answer-square-1').css({"borderTopColor": "transparent"});
	    		$('#answer-square-6').css({"borderRightColor": "transparent"});
	    		inverse = false;
	    	} else {
	    		$('#answer-square-2').css({"borderTopColor": "transparent"});
	    		$('#answer-square-5').css({"borderLeftColor": "transparent"});
	    		inverse = true;
	    	}
	    	setInverse(inverse)
	    }

	    function setInverse(value){
	    	inverse = value;
	    	console.log(inverse);
	    }

  	// Adds color to half of the square. Adds color to each half before increasing the count to the next integer
	  function addSquareColor(color){
	  	// Rounds the clickCount to the nearest whole number, than converts it to a string for html injection
	    var clickCountString = Math.floor(clickCount).toString();
			// Checks if clickCount is a whole number. If so, the squares top/left triangle color is set
	    if (clickCount % 1 == 0){
	    	if (inverse){
	    		$('#answer-square-' + clickCountString).css({"borderLeft": "250px solid " + color});
	    		dbsquares[Math.floor(clickCount)].sideColor = color;
	    	} else {
	    		$('#answer-square-' + clickCountString).css({"borderRight": "250px solid transparent"});
		      $('#answer-square-' + clickCountString).css({"borderTop": "250px solid " + color});
		      dbsquares[Math.floor(clickCount)].topColor = color;
	    	}
	      console.log(clickCount);
	      // Checks if clickCount end in 0.5. If so, the squares bottom/right triangle color is set 
	    } else if (clickCount % 1 == 0.5){
	    	if (inverse){
	    		$('#answer-square-' + clickCountString).css({"borderTop": "250px solid " + color});
	    		dbsquares[Math.floor(clickCount)].topColor = color;
	    	} else {
	      	$('#answer-square-' + clickCountString).css({"borderRight": "250px solid " + color});
	      	dbsquares[Math.floor(clickCount)].sideColor = color;
	      }
	      console.log(clickCount);
	      // Checks if patch is complete, then shows save button and patch.
        if (clickCount >= 5.5){
        	$('#save').removeClass('hidden');
          $('#dream-patch').removeClass('hidden');
          ref.push(dbsquares);
        }
	    }
	  }


	}]);
