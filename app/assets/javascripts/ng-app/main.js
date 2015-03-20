angular
	.module("SelmaApp", ['firebase'])
	.controller("patchController", ['$scope', '$firebase', function($scope, $firebase){
		$scope.squares = [1,2,3,4,5,6];
		$scope.addSquareColor = addSquareColor;
		var clickCount = -0.5;
		var inverse;
		var dbsquares = [{topColor: "", sideColor: ""}, {topColor: "", sideColor: ""}, {topColor: "", sideColor: ""},
										{topColor: "", sideColor: ""}, {topColor: "", sideColor: ""}, {topColor: "", sideColor: ""}]

		// default squares to send to firebase in case of client disconnet to maintain pattern sync
				var dbDefaultSquares = [{topColor: "#515D63", sideColor: "#ED028C"}, {topColor: "#FFF101", sideColor: "#231F20"}, {topColor: "#ED028C", sideColor: "#FFF101"},
										{topColor: "#231F20", sideColor: "#ED028C"}, {topColor: "#515D63", sideColor: "#FFF101"}, {topColor: "#515D63", sideColor: "#ED028C"}];
										// Old Colors
		// var dbDefaultSquares = [{topColor: "#AEE5F1", sideColor: "#FEBBCD"}, {topColor: "#B3BCBF", sideColor: "#AEE5F1"}, {topColor: "#FEBBCD", sideColor: "#B3BCBF"},
		// 								{topColor: "#F25239", sideColor: "#FEBBCD"}, {topColor: "#AEE5F1", sideColor: "#B3BCBF"}, {topColor: "#AEE5F1", sideColor: "#B3BCBF"}];
		var ref = new Firebase("https://selmaandwang.firebaseio.com/patches");
		var counterRef = ref.child("counter");
		var patches = $firebase(ref).$asObject();
		patches.$bindTo($scope, 'patches');

		var patchRef = ref.push();
		patchRef.onDisconnect().set(dbDefaultSquares);

		// Checks if x exists in a range of numbers. Used in setTransparentTriangles.
		function between(x, min, max){
			return x >= min && x <= max;
		}


		counterRef.once("value", function(snapshot) {
			console.log(snapshot.val())
			// sets local counter to match initial Firebase counter
			counter = snapshot.val() + 1;
			// Checks if quilt is full at 96 patches. If quilt is full, the patches database is reset.
			if (counter == 97){
				ref.remove();
				counter = 1;
			}
			// Increases counter in Firebase by 1
			counterRef.transaction(function(currentValue) {
		  	return (currentValue || 0) + 1;
			});
			console.log("counter = " + counter);
			setTransparentTriangles();
		});

	  // Sets which triangles will be taken out of the patch. Switches to create diamond pattern
		function setTransparentTriangles(){
    	if ( 
    	between(counter, 1, 3) || between(counter, 7, 9) || between(counter, 13, 15) || between(counter, 19, 21) || between(counter, 28, 30) ||
    	between(counter, 34, 36) || between(counter, 40, 42) || between(counter, 46, 51) || between(counter, 55, 57) || between(counter, 61, 63) ||
    	between(counter, 67, 69) || between(counter, 76, 78) || between(counter, 82, 84) || between(counter, 88, 90) || between(counter, 94, 96)
			){
    		$('#answer-square-0').css({"borderTopColor": "transparent"});
    		// $('.answer-square').css({"borderRight": "20vw solid #9BCAE1"});
    		$('.answer-square').css({"borderRight": "12vh solid transparent"});
    		inverse = false;
    	} else {
    		$('#answer-square-1').css({"borderTopColor": "transparent"});
    		// $('.answer-square').css({"borderLeft": "20vw solid #9BCAE1"});
    		$('.answer-square').css({"borderLeft": "12vh solid transparent"});
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
	    		$('#answer-square-' + clickCountString).css({"borderLeft": "12vh solid " + color});
	    		dbsquares[Math.floor(clickCount)].sideColor = color;
	    	} else {
	    		// $('#answer-square-' + clickCountString).css({"borderRight": "20vw solid transparent"}); NOT NEEDED FOR CURRENT BUILD
		      // $('#answer-square-' + clickCountString).css({"borderTop": "20vw solid " + color});
		      $('#answer-square-' + clickCountString).css({"borderTop": "12vh solid " + color});
		      dbsquares[Math.floor(clickCount)].topColor = color;
	    	}
	      console.log(clickCount);
	      checkForCompletePatch();
	      // Checks if clickCount end in 0.5. If so, the squares bottom/right triangle color is set 
	    } else if (clickCount % 1 == 0.5){
	    	if (inverse){
	    		// $('#answer-square-' + clickCountString).css({"borderTop": "20vw solid " + color});
	    		$('#answer-square-' + clickCountString).css({"borderTop": "12vh solid " + color});
	    		dbsquares[Math.floor(clickCount)].topColor = color;
	    	} else {
	      	// $('#answer-square-' + clickCountString).css({"borderRight": "20vw solid " + color});
	      	$('#answer-square-' + clickCountString).css({"borderRight": "12vh solid " + color});
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
	      $('.music-player').css({'display': 'none'});
	      $('#questions').css({'display': 'none'});
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
