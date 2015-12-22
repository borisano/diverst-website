//= require jquery
//= require jquery-smooth-scroll/src/jquery.smooth-scroll
//= require fastclick


// Fade in body when page is loaded

$(document).ready(function(){
  $("body").addClass("ready");
});


// Fastclick

$(function() {
  FastClick.attach(document.body);
});


// Product nav

$(".product-nav-trigger").click(function() {
  $("body").toggleClass("js-product-nav-open");
});


// Mobile nav

$(".nav__hamburger, .mobile-nav__close").click(function() {
  $("body").toggleClass("js-menu-open hidden");
});

$(".mobile-nav .btn").click(function() {
  $("body").toggleClass("js-menu-open hidden");
});


// Smooth scroll

$("a").smoothScroll({
  easing: "swing",
  speed: 300,
  offset: 2
});