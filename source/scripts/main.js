//= require jquery
//= require jquery-smooth-scroll/src/jquery.smooth-scroll
//= require fastclick
//= require knockout
//= require knockout-validation
//= require contact-form
//= require tooltipster

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


// Product nav

$(".js-demo-modal-trigger, .modal__close").click(function() {
  $("body").toggleClass("js-demo-modal-open hidden");
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


// Configure Kockout validations

ko.validation.init({
  errorMessageClass: "field__error",
  decorateInputElement: true,
  errorElementClass: 'field__input--error',
  parseInputAttributes: true
});

// Company email validation

ko.validation.rules['companyEmail'] = {
  validator: function (email, polarity) {
    if (/@hotmail/.test(email)) return !polarity;
    if (/@outlook/.test(email)) return !polarity;
    if (/@live/.test(email)) return !polarity;
    if (/@gmail/.test(email)) return !polarity;
    if (/@yahoo/.test(email)) return !polarity;
    if (/@me/.test(email)) return !polarity;
    if (/@msn/.test(email)) return !polarity;
    if (/@aol/.test(email)) return !polarity;

    return polarity;
  },
  message: 'Please enter a company email'
};

ko.validation.registerExtenders();

// Mount the Knockout contact form

ko.applyBindings(new ContactForm(), document.getElementById('sign-up'));