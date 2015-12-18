//= require jquery
//= require jquery-smooth-scroll


// Fade in body when page is loaded

$(document).ready(function(){
  $('body').addClass('ready');
});


// Mobile nav

$(".nav__hamburger, .mobile-nav__close").click(function() {
  $("body").toggleClass("js-menu-open");
});