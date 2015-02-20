<script type="text/paperscript" canvas="myCanvas">
  // declaring a new firebase application
      var myDataRef = new Firebase('https://railsample.firebaseio.com/');

   var user;
   var color1;
   var color2;
   var color3;
   var color4;
   // loading the assets from firebase

   myDataRef.on("value",function(snapshot) {
     var a = snapshot.val();
     for (var key in a) { 
       var obj = a[key];
       whoa(obj.x, obj.y)
       console.log('hi')
     }
   });
   // function for asking what color 
   function ask() {
      var user = prompt('happy or sad')
      if (user == 'sad') {
        color1 = '#69D2E7';
        color2 = '#A7DBD8';
        color3 = '#E0E4CC';
        color4 = '#FA6900';
      } else if (user == 'happy') {
        color1 = '#A8E6CE';
        color2 = '#DCEDC2';
        color3 = '#FFD3B5';
        color4 = '#ff8C94';
      }
   }
// function for drawing the dots on the page
   function whoa(x,y) {
        console.log(x, y)
        var point = new Point(x,y)
        console.log("1")
   var a = Math.floor((Math.random() * 4) + 1);
        console.log("2")
     var myCircle = new Path.Ellipse({
       size: [120,160] ,
       center: point
     });
     console.log('3')
     if (a == 1) {
       myCircle.fillColor = 'red';
     } else if (a == 2) {
        myCircle.fillColor = 'blue';
     } else if (a == 3) {
        myCircle.fillColor = 'peachpuff';
     } else if (a == 4) {
       myCircle.fillColor = 'tomato';
     }
     console.log('done')
     view.update();
   }
   // function the pushes the coordinates to firebase
   function onKeyDown(event) {
    if (event.key == 'space') {
      var x = Math.floor((Math.random() * 1000) + 100);
     var y = Math.floor((Math.random() * 1000) + 100);
     myDataRef.push({ x: x, y: y})
   
    }

   }
   // function that asks the question on mouse click
   function onMouseDown(event) {
     ask();
   }
 </script>