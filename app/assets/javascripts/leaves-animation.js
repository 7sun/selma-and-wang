$(function(){

	/* Define the number of leaves to be used in the animation */
	const NUMBER_OF_LEAVES = 300;

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
	    leafColor.style.backgroundColor = pickLeafColor();
	    
	    leafDiv.style.top = (Math.floor(Math.random() * (-5000 + -20) -20)).toString() + "px"

	    /* Position the leaf at a random location along the screen */
	    leafDiv.style.left = pixelValue(randomInteger(-5, 105));
	    
	    /* Randomly choose a spin animation */
	    var spinAnimationName = (Math.random() < 0.5) ? 'clockwiseSpin' : 'counterclockwiseSpinAndFlip';
	    
	    /* Set the -webkit-animation-name property with these values */
	    leafDiv.style.webkitAnimationName = 'fade, drop';
	    leafColor.style.webkitAnimationName = spinAnimationName;
	    
	    /* Figure out a random duration for the fade and drop animations */
	    var fadeAndDropDuration = durationValue(randomFloat(56, 74));
	    
	    /* Figure out another random duration for the spin animation */
	    var spinDuration = durationValue(randomFloat(4, 8));
	    /* Set the -webkit-animation-duration property with these values */
	    leafDiv.style.webkitAnimationDuration = fadeAndDropDuration + ', ' + fadeAndDropDuration;

	    var leafDelay = durationValue(randomFloat(0, 5));
	    leafDiv.style.webkitAnimationDelay = leafDelay + ', ' + leafDelay;

	    leafColor.style.webkitAnimationDuration = spinDuration;

	    // add the <img> to the <div>
	    leafDiv.appendChild(leafColor);

	    /* Return this img element so it can be added to the document */
	    return leafDiv;
		}

	/* Calls the init function when the "Falling Leaves" page is full loaded */
	window.addEventListener('load', init, false);

});
