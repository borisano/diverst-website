//= require jquery
//= require jquery-smooth-scroll
//= require fastclick


// Fastclick

$(function() {
    FastClick.attach(document.body);
});


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

$(".mobile-nav .btn").click(function() {
  $("body").toggleClass("js-menu-open");
});


// Temporarily hide page header image if not present

$(".page-header__image").error(function () { 
  $(this).hide(); 
});


/// Set offset for smooth scrolling

var mq = window.matchMedia( "(min-width: 1140px)" );

if (mq.matches) {
  $('a').smoothScroll({
    easing: 'swing',
    speed: 300,
    offset: -78 // Compensate for 1px difference
  });
}

else {
  $('a').smoothScroll({
    easing: 'swing',
    speed: 300,
    offset: 2
  });
}