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

  self.submitInfo = function() {
    self.errors.showAllMessages(true);

    if (self.errors().length === 0) {
      $.getJSON('http://ipinfo.io', function(visitorInfo) { // Get visitor info using a 3rd party service
        $.post('http://app.diverst.com/website/leads', $.extend({}, JSON.parse(ko.toJSON(self)), { visitor_info: visitorInfo }));
      });
    }
  };

  self.errors = ko.validation.group(self);
};