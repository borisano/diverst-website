//= require jquery
//= require jquery-smooth-scroll/src/jquery.smooth-scroll
//= require fastclick


// Fastclick

$(function() {
  FastClick.attach(document.body);
});


// Fade in body when page is loaded

$(document).ready(function(){
  $("body").addClass("ready");
});


// Fixed nav

$(window).scroll(function() {    
  var scroll = $(window).scrollTop();
  if (scroll >= 400) {
    $(".fixed-nav, .fixed-product-nav").addClass("visible");
  } else {
    $(".fixed-nav, .fixed-product-nav").removeClass("visible");
  }
});


// Product nav

$(".product-nav-trigger").click(function() {
  $("body").toggleClass("js-product-nav-open");
});


// Fixed product nav (scrolled)

$(".fixed-product-nav-trigger").click(function() {
  $("body").toggleClass("js-fixed-product-nav-open");
});


// Mobile nav

$(".nav__hamburger, .mobile-nav__close").click(function() {
  $("body").toggleClass("js-menu-open hidden");
});

$(".mobile-nav .btn").click(function() {
  $("body").toggleClass("js-menu-open hidden");
});


// Set offset for smooth scrolling

var mq = window.matchMedia( "(min-width: 1140px)" );
var menuHeight = $('.fixed-nav').eq(0).outerHeight();

if (mq.matches) {
  $("a").smoothScroll({
    easing: "swing",
    speed: 300,
    offset: -menuHeight + 2 // Compensate for 1px difference
  });
}

else {
  $("a").smoothScroll({
    easing: "swing",
    speed: 300,
    offset: 2
  });
}