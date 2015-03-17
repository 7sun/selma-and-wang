angular
	.module("SelmaApp", ['firebase'])
	.controller("patchController", ['$scope', '$firebase', function($scope, $firebase){
		$scope.squares = [1,2,3,4,5,6];
		$scope.addSquareColor = addSquareColor;
		var clickCount = -0.5;
		var inverse;
		var dbsquares = [{topColor: "", sideColor: ""}, {topColor: "", sideColor: ""}, {topColor: "", sideColor: ""},
										{topColor: "", sideColor: ""}, {topColor: "", sideColor: ""}, {topColor: "", sideColor: ""}]

		// default squares to send to firebase in case of client disconnet to maintain patternsync
		var dbDefaultSquares = [{topColor: "#AEE5F1", sideColor: "#FEBBCD"}, {topColor: "#B3BCBF", sideColor: "#AEE5F1"}, {topColor: "#FEBBCD", sideColor: "#B3BCBF"},
										{topColor: "#F25239", sideColor: "#FEBBCD"}, {topColor: "#AEE5F1", sideColor: "#B3BCBF"}, {topColor: "#AEE5F1", sideColor: "#B3BCBF"}]
		var ref = new Firebase("https://selmaandwang.firebaseio.com/patches");
		var patches = $firebase(ref).$asObject();
		patches.$bindTo($scope, 'patches');

		var patchRef = ref.push();
		patchRef.onDisconnect().set(dbDefaultSquares);

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

	  // Sets which triangles will be taken out of the patch. Switches to create diamond pattern
		function setTransparentTriangles(){
    	if ( between(counter, 1, 3) || between(counter, 7, 9) || between(counter, 16, 18) || between(counter, 22, 24) ){
    		$('#answer-square-0').css({"borderTopColor": "transparent"});
    		// $('.answer-square').css({"borderRight": "20vw solid #9BCAE1"});
    		$('.answer-square').css({"borderRight": "15vh solid transparent"});
    		inverse = false;
    	} else {
    		$('#answer-square-1').css({"borderTopColor": "transparent"});
    		// $('.answer-square').css({"borderLeft": "20vw solid #9BCAE1"});
    		$('.answer-square').css({"borderLeft": "15vh solid transparent"});
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
	    		// $('#answer-square-' + clickCountString).css({"borderLeft": "20vw solid " + color});
	    		$('#answer-square-' + clickCountString).css({"borderLeft": "15vh solid " + color});
	    		dbsquares[Math.floor(clickCount)].sideColor = color;
	    	} else {
	    		// $('#answer-square-' + clickCountString).css({"borderRight": "20vw solid transparent"}); NOT NEEDED FOR CURRENT BUILD
		      // $('#answer-square-' + clickCountString).css({"borderTop": "20vw solid " + color});
		      $('#answer-square-' + clickCountString).css({"borderTop": "15vh solid " + color});
		      dbsquares[Math.floor(clickCount)].topColor = color;
	    	}
	      console.log(clickCount);
	      checkForCompletePatch();
	      // Checks if clickCount end in 0.5. If so, the squares bottom/right triangle color is set 
	    } else if (clickCount % 1 == 0.5){
	    	if (inverse){
	    		// $('#answer-square-' + clickCountString).css({"borderTop": "20vw solid " + color});
	    		$('#answer-square-' + clickCountString).css({"borderTop": "15vh solid " + color});
	    		dbsquares[Math.floor(clickCount)].topColor = color;
	    	} else {
	      	// $('#answer-square-' + clickCountString).css({"borderRight": "20vw solid " + color});
	      	$('#answer-square-' + clickCountString).css({"borderRight": "15vh solid " + color});
	      	dbsquares[Math.floor(clickCount)].sideColor = color;
	      }
	      console.log(clickCount);
	      checkForCompletePatch();
      }
	  }

    // Checks if patch is complete, then shows save button and patch and stops the music.
	  function checkForCompletePatch(){
	    if (clickCount >= 5.5 || (clickCount >= 5 && inverse == false) ){
	    	$('#save').removeClass('hidden');
	      $('#dream-patch').removeClass('hidden');
	      $('#scroll-link-2 button').removeClass('hidden');
	      $('#to-quilt').removeClass('hidden');
	      $('.music-player').addClass('hidden');
	      // Stops the music from playing
	      $('.play-icon').trigger('click');
	      patchRef.set(dbsquares);
	      patchRef.onDisconnect().cancel();
	      // prepCanvas();
	    }
	  }

		// Hides question square after user clicks a square and increases click count.
	  $('.square').click(function(){
	    $('#questions').addClass('hidden');
	    $('#questions p').removeClass('expand');
	    $('.square').removeClass('pop-up');
	    if (inverse && (clickCount == 1.0 || clickCount == 3.5)){
	      clickCount += 1.0;
	    } else if (inverse == false && (clickCount == -0.5 || clickCount == 5.0)){
	    	clickCount += 1.0;
	    } else {
	      clickCount += 0.5;
	    }
	  })

		  // function prepCanvas(){
   //  	html2canvas($("#dream-patch"), {
   //    	onrendered: function(canvas) {
   //      	save.href = canvas.toDataURL("image/png")              
   //    	}
   //   	})
   //  }


}]);
