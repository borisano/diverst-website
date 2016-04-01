var ContactForm = function() {
  var self = this;

  // Contact fields
  self.name = ko.observable().extend({
    required: true,
    pattern: {
      params: ' ',
      message: "Please enter your full name."
    }
  });

  self.email = ko.observable().extend({
    required: true,
    email: true,
    companyEmail: true
  });

  self.isCustomNetworkGroupNameVisible = ko.computed(function() {
    self.networkGroupName() === 'Other';
  });

  self.submitInfo = function() {
    self.errors.showAllMessages(true);

    if (self.errors().length === 0) {
      $.getJSON('https://ipinfo.io?token=fe594ecc38f7df', function(visitorInfo) { // Get visitor info using a 3rd party service
        $.post('https://app.diverst.com/website/leads', $.extend({}, JSON.parse(ko.toJSON(self)), { visitor_info: visitorInfo }));
      });

      // Show submitted state
      $('#sign-up-form').css('display', 'none');
      $('#sign-up .form-hint').css('display', 'block');
    }
  };

  self.errors = ko.validation.group(self);
};