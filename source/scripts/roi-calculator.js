var ROICalculator = function() {
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

  self.nbEmployeesInput = ko.observable(5000).extend({ required: true });
  self.averageSalaryInput = ko.observable(50000).extend({ required: true });
  self.turnoverRate = ko.observable(20).extend({ required: true });
  self.sizeOfDITeam = ko.observable(15).extend({ required: true });

  self.obfuscateResults = ko.observable(true);

  self.showROI = function() {
    self.errors.showAllMessages(true);

    if (self.errors().length === 0) {
      self.obfuscateResults(false);
      $.smoothScroll({ scrollTarget: '#roi-results' });
      sendInfoToCRM();
    }
  };

  var sendInfoToCRM = function() {
    $.getJSON('http://ipinfo.io', function(visitorInfo) { // Get visitor info using a 3rd party service
      $.post('http://app.diverst.com/website/leads', $.extend({}, JSON.parse(ko.toJSON(self)), { visitor_info: visitorInfo }));
    });
  };

  var beautifyAmount = function(amount) {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  self.nbEmployees = ko.computed(function() {
    return beautifyAmount(self.nbEmployeesInput());
  }, this);

  self.averageSalary = ko.computed(function() {
    return beautifyAmount(self.averageSalaryInput());
  }, this);

  // Calculated savings

  self.numericSavings = {
    absenteeism: ko.computed(function() {
      return parseInt(self.averageSalaryInput() * 1.31 / 240 * 1.5 * self.nbEmployeesInput());
    }, this),
    retention: ko.computed(function() {
      return parseInt(self.nbEmployeesInput() * self.averageSalaryInput() * 0.38 * self.turnoverRate()/100 * 0.22);
    }, this),
    hrTime: ko.computed(function() {
      return parseInt(self.sizeOfDITeam() * self.averageSalaryInput() * 1.31 * 0.1);
    }, this),
    productivityIncrease: ko.computed(function() {
      return parseInt(self.nbEmployeesInput() * self.averageSalaryInput() * 1.31 * 0.05);
    }, this)
  };

  self.savings = {
    absenteeism: ko.computed(function() {
      return beautifyAmount(self.numericSavings.absenteeism());
    }, this),
    retention: ko.computed(function() {
      return beautifyAmount(self.numericSavings.retention());
    }, this),
    hrTime: ko.computed(function() {
      return beautifyAmount(self.numericSavings.hrTime());
    }, this),
    productivityIncrease: ko.computed(function() {
      return beautifyAmount(self.numericSavings.productivityIncrease());
    }, this)
  };

  self.totalSavings = ko.computed(function() {
    var amount = self.numericSavings.absenteeism() + self.numericSavings.retention() + self.numericSavings.hrTime() + self.numericSavings.productivityIncrease();
    return beautifyAmount(amount);
  }, this);

  self.errors = ko.validation.group(self);

  // Init tooltipster
  $('.tooltip').tooltipster();
};