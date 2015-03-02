angular
	.module("SelmaApp", ['firebase'])
	.controller("patchController", ['$scope', '$firebase', function($scope, $firebase){
			var ref = new Firebase("https://selmaandwang.firebaseio.com/patches");
			var patches = $firebase(ref).$asObject();
			 patches.$bindTo($scope, 'patches');
  		console.log("patches: " + patches);



  		$scope.addSquareColor = addSquareColor;
  		var dbsquares = [{topColor: "", rightColor: ""}, {topColor: "", rightColor: ""}, {topColor: "", rightColor: ""},
								{topColor: "", rightColor: ""}, {topColor: "", rightColor: ""}, {topColor: "", rightColor: ""}]
  		$scope.squares = [1,2,3,4,5,6];

  	// Adds color to half of the square. Adds color to each half before increasing the count to the next integer
	  function addSquareColor(color){
	    var clickCountString = Math.floor(clickCount).toString();
	    if (clickCount % 1 == 0){
	      $('#answer-square-' + clickCountString).css({"borderTopColor": color});
	      dbsquares[Math.floor(clickCount)].topColor = color;
	      console.log(clickCount); 
	    } else if (clickCount % 1 == 0.5){
	      $('#answer-square-' + clickCountString).css({"borderRightColor": color});
	      dbsquares[Math.floor(clickCount)].rightColor = color;
	      console.log(clickCount);
        if (clickCount >= 5.5){
        	$('#save').removeClass('hidden');
          $('#dream-patch').removeClass('hidden');
          ref.push(dbsquares);
        }
	    }
	  }








	}]);
