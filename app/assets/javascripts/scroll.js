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

// 

$("#button-down").click(function() {
  alert( "Handler for .click() called." );
});

// $(document).ready(function (){
//   $("#button-down").click(function (){
//     $(this).animate(function(){
//       $('html, body').animate({
//         scrollTop: $("#scroll-link-4").offset().top
//       }, 2000);
// });


// Menu Collapse

$(document).ready(function() {
  var menuToggle = $('#js-mobile-menu').unbind();
  $('#js-navigation-menu').removeClass("show");

  menuToggle.on('click', function(e) {
    e.preventDefault();
    $('#js-navigation-menu').slideToggle(function(){
      if($('#js-navigation-menu').is(':hidden')) {
        $('#js-navigation-menu').removeAttr('style');
      }
    });
  });
});

// Loading

$body = $("body");

$(document).on({
    ajaxStart: function() { $body.addClass("loading");    },
     ajaxStop: function() { $body.removeClass("loading"); }    
});