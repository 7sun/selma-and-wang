angular
	.module("SelmaApp", ['firebase'])
	.controller("patchController", ['$scope', '$firebase', function($scope, $firebase){
		$scope.squares = [1,2,3,4,5,6];
		$scope.addSquareColor = addSquareColor;
		var inverse;
		var dbsquares = [{topColor: "", sideColor: ""}, {topColor: "", sideColor: ""}, {topColor: "", sideColor: ""},
										{topColor: "", sideColor: ""}, {topColor: "", sideColor: ""}, {topColor: "", sideColor: ""}]

		var ref = new Firebase("https://selmaandwang.firebaseio.com/patches");
		var patches = $firebase(ref).$asObject();
		patches.$bindTo($scope, 'patches');

		// Checks if x exists in a range of numbers. Used in setTransparentTriangles.
		function between(x, min, max){
			return x >= min && x <= max;
		}

		var counterRef = ref.child("counter");
		counterRef.once("value", function(snapshot) {
			// sets local counter to match initial Firebase counter
			counter = snapshot.val() + 1;
			// Increases counter in Firebase by 1
			counterRef.transaction(function(currentValue) {
		  	return (currentValue || 0) + 1;
			});
			setTransparentTriangles();
		});

		// Sets Soundcloud iframe as a player controllable by js. Also sets global variables.
	  var widgetIframe = document.getElementById('sc-widget'),
	      widget = SC.Widget(widgetIframe),
	      clickCount = -0.5,
	      track_position = "";

	  // logs the position of the track in milliseconds
	  function position(){
	  	widget.getPosition(function(positionSC){
	  		console.log(Math.round(positionSC));
	  	});
	  }

	  // Listens to the track position and prompts the user with a new question every 1 second
	  widget.bind(SC.Widget.Events.PLAY_PROGRESS, function(eventData) {
	    track_position = JSON.stringify(eventData.currentPosition);
	    track_position = Math.floor(track_position/100);
	    if (track_position % 10 == 0 && track_position > 0){
	      $('#questions').removeClass('hidden');
	    };
	  });

	  // Sets which triangles will be taken out of the patch. Switches to create diamond pattern
		function setTransparentTriangles(){
			console.log("outside func counter val: " + counter);
    	if ( between(counter, 1, 3) || between(counter, 7, 9) || between(counter, 16, 18) || between(counter, 22, 24) ){
    		$('#answer-square-0').css({"borderTopColor": "#A0E18F"});
    		$('.answer-square').css({"borderRight": "250px solid #A0E18F"});
    		inverse = false;
    	} else {
    		$('#answer-square-1').css({"borderTopColor": "#A0E18F"});
    		$('.answer-square').css({"borderLeft": "250px solid #A0E18F"});
    		inverse = true;
    	}
    	setInverse(inverse)
    }

    // Sets inverse property of the patch to be globally available
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
	    		// $('#answer-square-' + clickCountString).css({"borderRight": "250px solid transparent"});
		      $('#answer-square-' + clickCountString).css({"borderTop": "250px solid " + color});
		      dbsquares[Math.floor(clickCount)].topColor = color;
	    	}
	      console.log(clickCount);
	      checkForCompletePatch();
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
	      checkForCompletePatch();
      }
	  }

    // Checks if patch is complete, then shows save button and patch.
	  function checkForCompletePatch(){
	    if (clickCount >= 5.5 || (clickCount >= 5 && inverse == false) ){
	    	$('#save').removeClass('hidden');
	      $('#dream-patch').removeClass('hidden');
	      ref.push(dbsquares);
	    }
	  }

		// Hides question square after user clicks a square and increases click count.
	  $('.square').click(function(){
	    $('#questions').addClass('hidden');
	    if (inverse && (clickCount == 1.0 || clickCount == 3.5)){
	      clickCount += 1.0;
	    } else if (inverse == false && (clickCount == -0.5 || clickCount == 5.0)){
	    	clickCount += 1.0;
	    } else {
	      clickCount += 0.5;
	    }
	  })

	}]);
