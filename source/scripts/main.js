//= require jquery
//= require jquery-smooth-scroll


// Fade in body when page is loaded

$(document).ready(function(){
  $('body').addClass('ready');
});


// Fixed nav

$(window).scroll(function() {    
    var scroll = $(window).scrollTop();

    if (scroll >= 400) {
        $(".fixed-nav").addClass("visible");
    } else {
        $(".fixed-nav").removeClass("visible");
    }
});


// Mobile nav

$(".nav__hamburger, .mobile-nav__close").click(function() {
  $("body").toggleClass("js-menu-open");
});


$(".page-header__image").error(function () { 
  $(this).hide(); 
});

$('a').smoothScroll({
  easing: 'swing',
  speed: 300,
  offset: 2 // Compensate for 2px offset bug
});