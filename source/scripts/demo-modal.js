var DemoModal = function() {
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

  self.phone = ko.observable().extend({ required: true });


  // Company fields

  self.company = ko.observable().extend({ required: true });
  self.networkGroupName = ko.observable().extend({ required: true });
  self.nbERGs = ko.observable();
  self.hasDIInitiatives = ko.observable().extend({ required: true });
  self.interestedIn = ko.observableArray();
  self.message = ko.observable();
  self.hearAboutUs = ko.observable();
  self.customNetworkGroupName = ko.observable();


  // Utility variables

  self.loading = ko.observable(false);
  self.done = ko.observable(false);


  // View functions

  self.submitRequest = function() {
    self.errors.showAllMessages(true);

    if (self.errors().length === 0) {
      sendInfoToCRM();
    }
  };

  self.isCustomNetworkGroupNameVisible = ko.computed(function() {
    return self.networkGroupName() === "Other";
  });


  // Private functions

  var sendInfoToCRM = function() {
    $.getJSON('//ipinfo.io?token=fe594ecc38f7df', function(visitorInfo) { // Get visitor info using a 3rd party service
      self.loading(true);
      $.post('//app.diverst.com/website/leads', $.extend({}, JSON.parse(ko.toJSON(self)), { visitor_info: visitorInfo })).done(function() {
        self.loading(false);
        self.done(true);
      });
    });
  };


  // Error management

  self.errors = ko.validation.group(self);
};