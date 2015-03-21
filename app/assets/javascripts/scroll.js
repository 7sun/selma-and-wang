// In Page Scrolling

// (function (jQuery) {
//   jQuery.mark = {
//     jump: function (options) {
//       var defaults = {
//         selector: 'a.scroll-on-page-link'
//       };
//       if (typeof options == 'string') defaults.selector = options;
//       var options = jQuery.extend(defaults, options);
//       return jQuery(options.selector).click(function (e) {
//         var jumpobj = jQuery(this);
//         var target = jumpobj.attr('href');
//         var thespeed = 725;
//         var offset = jQuery(target).offset().top;
//         jQuery('html,body').animate({
//           scrollTop: offset
//         }, thespeed, 'swing')
//         e.preventDefault();
//       })
//     }
//   }
// })(jQuery);

// jQuery(function(){  
//   jQuery.mark.jump();
// });

// One Page Scroll

$(document).ready(function() {
  $(".main").onepage_scroll({
     sectionContainer: "article",     // sectionContainer accepts any kind of selector in case you don't want to use section
     easing: "ease",                  // Easing options accepts the CSS3 easing animation such "ease", "linear", "ease-in",
                                      // "ease-out", "ease-in-out", or even cubic bezier value such as "cubic-bezier(0.175, 0.885, 0.420, 1.310)"
     animationTime: 725,              // AnimationTime let you define how long each section takes to animate
     pagination: false,               // You can either show or hide the pagination. Toggle true for show, false for hide.
     updateURL: false,                // Toggle this true if you want the URL to be updated automatically when the user scroll to each page.
     afterMove: function(index) {     // This option accepts a callback function. The function will be called before the page moves.
      if (index == 1) {
        $("body").css("background-color","#A0E18F");
      } if (index == 2) {
        $("body").css("background-color","#F15A29");
      } if (index == 3) {
        $("body").css("background-color","#F9ED32");
      } if (index == 4){
        $("body").css("background-color","#64818F");
      } if (index == 5){
        $("body").css("background-color","#9FE1C3");
      } if (index == 6) {
        $("body").css("background-color","#5ab9ad");
      } if (index == 7) {
        $("body").css("background-color","#b98bb9");
      }
     },                               
     beforeMove: function(index) {},  // This option accepts a callback function. The function will be called after the page moves.
     loop: false,                     // You can have the page loop back to the top/bottom when the user navigates at up/down on the first/last page.
     keyboard: true,                  // You can activate the keyboard controls
     responsiveFallback: false,       // You can fallback to normal page scroll by defining the width of the browser in which
                                      // you want the responsive fallback to be triggered. For example, set this to 600 and whenever
                                      // the browser's width is less than 600, the fallback will kick in.
     direction: "vertical"            // You can now define the direction of the One Page Scroll animation. Options available are "vertical" and "horizontal". The default value is "vertical".  
  });
});

// On Page scroll for buttons

$(document).ready(function() {
  $( "#going-down" ).click(function() {
    $(".main").moveDown();
  });
});

// $(document).ready(function() {
//   $( "#to-quilt" ).click(function() {
//     $(".main").moveDown();
//   });
// });

$(document).ready(function() {
  $( "#going-up" ).click(function() {
    $(".main").moveUp();
  });
});

$(document).ready(function() {
  $( "#going-home" ).click(function() {
     $(".main").moveTo(1);
  });
});

$(document).ready(function() {
  $( "#going-about" ).click(function() {
     $(".main").moveTo(7);
  });
});

// $(document).ready(function() {
//   $( "#to-quilt" ).click(function() {
//      $(".main").moveTo(5);
//   });
// });

$(document).ready(function() {
  $( "#end" ).click(function() {
    $(".main").moveTo(1);
  });
});

$(document).ready(function() {
  $( ".scn-btns" ).click(function() {
    $(".main").moveDown();
  });
});

$(document).ready(function() {
  $( "#to-quilt" ).click(function() {
    // $(".main").moveDown();
    $( "#quilt .quilt-patch:nth-last-child(2)" ).addClass('reveal');
  });
});

// Menu Collapse

// $(document).ready(function() {
//   var menuToggle = $('#js-mobile-menu').unbind();
//   $('#js-navigation-menu').removeClass("show");

//   menuToggle.on('click', function(e) {
//     e.preventDefault();
//     $('#js-navigation-menu').slideToggle(function(){
//       if($('#js-navigation-menu').is(':hidden')) {
//         $('#js-navigation-menu').removeAttr('style');
//       }
//     });
//   });
// });

// Loading

// $myCanvas = $("#myCanvas");

// $(document).load({
//     ajaxStart: function() { $myCanvas.addClass("loading");   },
//     ajaxStop:  function() { $myCanvas.removeClass("loading");}    
// });

// Modal

$(function() {
  $("#modal-1").on("change", function() {
    if ($(this).is(":checked")) {
      $("body").addClass("modal-open");
    } else {
      $("body").removeClass("modal-open");
    }
  });

  $(".modal-window").on("click", function() {
    $(".modal-state:checked").prop("checked", false).change();
  });

  $(".modal-inner").on("click", function(e) {
    e.stopPropagation();
  });
});
