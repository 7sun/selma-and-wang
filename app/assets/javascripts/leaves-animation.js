$(".soundcloud").ready(function(){

	/* Define the number of leaves to be used in the animation */
	const NUMBER_OF_LEAVES = 140;

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
	    return value + 'vw';
	}

	/*
	    Returns a duration value for the falling animation.
	*/
	function durationValue(value)
	{
	    return value + 's';
	}

	/*
	    "Leaves.css" implements two spin 
	    animations for the leaves: clockwiseSpin and counterclockwiseSpinAndFlip. This
	    function determines which of these spin animations should be applied to each leaf.
	*/
	function createALeaf() {
	    /* Start by creating a wrapper div, and an empty div element */
	    var leafDiv = document.createElement('div');
	    var leafColor = document.createElement('div');
	    
	    /* Randomly choose a leaf color and assign it to the newly created element */
	    function pickLeafColor(){
	    	var number = Math.floor(Math.random() * (13 - 1)) + 1;
	    	if (number == 1){
	    		return "#ED1C24";
	    	}
	    	else if (number == 2){
	    		return "#F7941E";
	    	}
	    	else if (number == 3){
	    		return "#92278F";
	    	}
	    	else if (number == 4){
	    		return "#DA1C5C";
	    	}
	    	else if (number == 5){
	    		return "#D7DF23";
	    	}
	    	else if (number == 6){
	    		return "#231F20";
	    	}
	    	else if (number == 7){
	    		return "#FFDE17";
	    	}
	    	else if (number == 8){
	    		return "#E2CA30";
	    	}
	    	else if (number == 9){
	    		return "#954124";
	    	}
	    	else if (number == 10){
	    		return "#60391";
	    	}
	    	else if (number == 11){
	    		return "#414042";
	    	}
	    	else if (number == 12){
	    		return "#71845C";
	    	}
	    }

	    /* Randomly choose a leaf size and assign it to the newly created element */
	    function pickLeafSize(){
	    	var number = Math.floor(Math.random() * (5 - 1)) + 1;
	    	if (number == 1){
	    		return ["20px", "25px"];
	    	}
	    	else if (number == 2){
	    		return ["32px", "40px"];
	    	}
	    	else if (number == 3){
	    		return ["44px", "55px"];
	    	}
	    	else if (number == 4){
	    		return ["56px", "70px"];
	    	}

	    }

	    var leafSize = pickLeafSize();
	    leafColor.style.width = leafSize[0];
	    leafColor.style.height = leafSize[1];
	    leafColor.style.backgroundColor = pickLeafColor();

	    leafDiv.style.top = (Math.floor(Math.random() * (-5000 + -20) -20)).toString() + "px"

	    /* Position the leaf at a random location along the screen */
	    leafDiv.style.left = pixelValue(randomInteger(-5, 105));
	    
	    /* Randomly choose a spin animation */
	    var spinAnimationName = (Math.random() < 0.5) ? 'clockwiseSpin' : 'counterclockwiseSpinAndFlip';
	    
	    /* Set the animation-name property with these values */
	    leafDiv.style.webkitAnimationName = 'fade, drop';
	    // leafDiv.style.animationName = 'fade, drop';
	    leafDiv.style.MozAnimationName = 'fade, drop';
	    leafColor.style.webkitAnimationName = spinAnimationName;
	    // leafColor.style.animationName = spinAnimationName;
	    leafColor.style.MozAnimationName = spinAnimationName;
	    
	    /* Figure out a random duration for the fade and drop animations */
	    var fadeAndDropDuration = durationValue(randomFloat(56, 74));
	    
	    /* Figure out another random duration for the spin animation */
	    var spinDuration = durationValue(randomFloat(4, 8));
	    /* Set the animation-duration property with these values */
	    leafDiv.style.webkitAnimationDuration = fadeAndDropDuration + ', ' + fadeAndDropDuration;
	    // leafDiv.style.animationDuration = fadeAndDropDuration + ', ' + fadeAndDropDuration;
	    leafDiv.style.MozAnimationDuration = fadeAndDropDuration + ', ' + fadeAndDropDuration;

	    var leafDelay = durationValue(randomFloat(0, 5));
	    leafDiv.style.webkitAnimationDelay = leafDelay + ', ' + leafDelay;
	    // leafDiv.style.animationDelay = leafDelay + ', ' + leafDelay;
	    leafDiv.style.MozAnimationDelay = leafDelay + ', ' + leafDelay;

	    leafColor.style.webkitAnimationDuration = spinDuration;
	    // leafColor.style.animationDuration = spinDuration;
	    leafColor.style.MozAnimationDuration = spinDuration;

	    // add the <img> to the <div>
	    leafDiv.appendChild(leafColor);

	    /* Return this img element so it can be added to the document */
	    return leafDiv;
		}

	/* Calls the init function when the "Falling Leaves" page is full loaded */
	window.addEventListener('load', init, false);

});
