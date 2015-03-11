angular
	.module("SelmaApp", ['firebase'])
	.controller("patchController", ['$scope', '$firebase', function($scope, $firebase){
		// $scope.startLeaf = startLeaf;
		// $scope.startLeaf = stopLeaf;
		// $scope.leafUpdate = leafUpdate;

		$scope.squares = [1,2,3,4,5,6];
		$scope.addSquareColor = addSquareColor;
		$scope.togglePlay = togglePlay;
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
	      $('#questions p').addClass('expand');
	      $('.square').addClass('pop-up');
	    };
	  });

	  // Sets which triangles will be taken out of the patch. Switches to create diamond pattern
		function setTransparentTriangles(){
			console.log(counter);
    	if ( between(counter, 1, 3) || between(counter, 7, 9) || between(counter, 16, 18) || between(counter, 22, 24) ){
    		$('#answer-square-0').css({"borderTopColor": "transparent"});
    		// $('.answer-square').css({"borderRight": "20vw solid #9BCAE1"});
    		$('.answer-square').css({"borderRight": "140px solid transparent"});
    		inverse = false;
    	} else {
    		$('#answer-square-1').css({"borderTopColor": "transparent"});
    		// $('.answer-square').css({"borderLeft": "20vw solid #9BCAE1"});
    		$('.answer-square').css({"borderLeft": "140px solid transparent"});
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
	    		$('#answer-square-' + clickCountString).css({"borderLeft": "140px solid " + color});
	    		dbsquares[Math.floor(clickCount)].sideColor = color;
	    	} else {
	    		// $('#answer-square-' + clickCountString).css({"borderRight": "20vw solid transparent"}); NOT NEEDED FOR CURRENT BUILD
		      // $('#answer-square-' + clickCountString).css({"borderTop": "20vw solid " + color});
		      $('#answer-square-' + clickCountString).css({"borderTop": "140px solid " + color});
		      dbsquares[Math.floor(clickCount)].topColor = color;
	    	}
	      console.log(clickCount);
	      checkForCompletePatch();
	      // Checks if clickCount end in 0.5. If so, the squares bottom/right triangle color is set 
	    } else if (clickCount % 1 == 0.5){
	    	if (inverse){
	    		// $('#answer-square-' + clickCountString).css({"borderTop": "20vw solid " + color});
	    		$('#answer-square-' + clickCountString).css({"borderTop": "140px solid " + color});
	    		dbsquares[Math.floor(clickCount)].topColor = color;
	    	} else {
	      	// $('#answer-square-' + clickCountString).css({"borderRight": "20vw solid " + color});
	      	$('#answer-square-' + clickCountString).css({"borderRight": "140px solid " + color});
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
	      $('#scroll-link-2 button').removeClass('hidden');
	      $('#to-quilt').removeClass('hidden');
	      patchRef.set(dbsquares);
	      patchRef.onDisconnect().cancel();
	      // prepCanvas();
	    }
	  }

	  // function prepCanvas(){
   //  	html2canvas($("#dream-patch"), {
   //    	onrendered: function(canvas) {
   //      	save.href = canvas.toDataURL("image/png")              
   //    	}
   //   	})
   //  }

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

	  function togglePlay(){
	  	$('.play-icon').toggleClass('fa-pause');
	  	$('.play-icon').toggleClass('fa-play');
	  	widget.toggle();
	  }

	
/* Define the number of leaves to be used in the animation */
const NUMBER_OF_LEAVES = 400;

/* 
    Called when the "Falling Leaves" page is completely loaded.
*/
function init()
{
    /* Get a reference to the element that will contain the leaves */
    var container = document.getElementById('leafContainer');
    /* Fill the empty container with new leaves */
    for (var i = 0; i < NUMBER_OF_LEAVES; i++) 
    {
        container.appendChild(createALeaf());
    }
}


/*
    Receives the lowest and highest values of a range and
    returns a random integer that falls within that range.
*/
function randomInteger(low, high)
{
    return low + Math.floor(Math.random() * (high - low));
}


/*
   Receives the lowest and highest values of a range and
   returns a random float that falls within that range.
*/
function randomFloat(low, high)
{
    return low + Math.random() * (high - low);
}


/*
    Receives a number and returns its CSS pixel value.
*/
function pixelValue(value)
{
    return value + 'px';
}


/*
    Returns a duration value for the falling animation.
*/

function durationValue(value)
{
    return value + 's';
}


/*
    Uses an img element to create each leaf. "Leaves.css" implements two spin 
    animations for the leaves: clockwiseSpin and counterclockwiseSpinAndFlip. This
    function determines which of these spin animations should be applied to each leaf.
    
*/
function createALeaf() {
    /* Start by creating a wrapper div, and an empty img element */
    var leafDiv = document.createElement('div');
    var image = document.createElement('div');
    
    /* Randomly choose a leaf color and assign it to the newly created element */

    function pickLeafColor(){
    	var number = Math.floor(Math.random() * (5 - 1)) + 1;
    	if (number == 1){
    		return "cornflowerblue";
    	}
    	else if (number == 2){
    		return "gold";
    	}
    	else if (number == 3){
    		return "darkorange";
    	}
    	else if (number == 4){
    		return "aquamarine";
    	}
    }
    image.style.backgroundColor = pickLeafColor();
    
    leafDiv.style.top = (Math.floor(Math.random() * (-5000 + -20) -20)).toString() + "px"

    /* Position the leaf at a random location along the screen */
    leafDiv.style.left = pixelValue(randomInteger(0, 1400));
    
    /* Randomly choose a spin animation */
    var spinAnimationName = (Math.random() < 0.5) ? 'clockwiseSpin' : 'counterclockwiseSpinAndFlip';
    
    /* Set the -webkit-animation-name property with these values */
    leafDiv.style.webkitAnimationName = 'fade, drop';
    image.style.webkitAnimationName = spinAnimationName;
    
    /* Figure out a random duration for the fade and drop animations */
    var fadeAndDropDuration = durationValue(randomFloat(56, 74));
    
    /* Figure out another random duration for the spin animation */
    var spinDuration = durationValue(randomFloat(4, 8));
    /* Set the -webkit-animation-duration property with these values */
    leafDiv.style.webkitAnimationDuration = fadeAndDropDuration + ', ' + fadeAndDropDuration;

    var leafDelay = durationValue(randomFloat(0, 5));
    leafDiv.style.webkitAnimationDelay = leafDelay + ', ' + leafDelay;

    image.style.webkitAnimationDuration = spinDuration;

    // add the <img> to the <div>
    leafDiv.appendChild(image);

    /* Return this img element so it can be added to the document */
    return leafDiv;
	}


	/* Calls the init function when the "Falling Leaves" page is full loaded */
	window.addEventListener('load', init, false);



}]);
