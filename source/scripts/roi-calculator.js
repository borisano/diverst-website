//= require knockout
//= require knockout-validation

// Configure Knouckout validations
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

// Utility functions
var beautifyAmount = function(amount) {
  return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

var vm = {
  // Contact fields
  name: ko.observable().extend({ required: true }),
  email: ko.observable().extend({
    required: true,
    email: true,
    companyEmail: true
  }),
  phone: ko.observable().extend({ required: true }),

  // Company fields
  nbEmployeesInput: ko.observable(1000).extend({ required: true }),
  averageSalaryInput: ko.observable(50000).extend({ required: true }),
  turnoverRate: ko.observable(20).extend({ required: true }),
  sizeOfDITeam: ko.observable(15).extend({ required: true }),

  obfuscateResults: ko.observable(true),

  // Actions
  showROI: function() {
    vm.errors.showAllMessages(true);

    if (vm.errors.length === 0) {
      vm.obfuscateResults(false);
    }

    $.smoothScroll({
      scrollTarget: '#roi-results'
    });
  }
};

vm.nbEmployees = ko.computed(function() {
  return beautifyAmount(vm.nbEmployeesInput());
}, this);

vm.averageSalary = ko.computed(function() {
  return beautifyAmount(vm.averageSalaryInput());
}, this);

// Calculated savings
vm.numericSavings = {
  absenteeism: ko.computed(function() {
    return parseInt(vm.averageSalaryInput() * 1.31 / 240 * 1.5 * vm.nbEmployeesInput());
  }, this),
  retention: ko.computed(function() {
    return parseInt(vm.nbEmployeesInput() * vm.averageSalaryInput() * 0.38 * vm.turnoverRate()/100 * 0.22);
  }, this),
  hrTime: ko.computed(function() {
    return parseInt(vm.sizeOfDITeam() * vm.averageSalaryInput() * 1.31 * 0.1);
  }, this),
  productivityIncrease: ko.computed(function() {
    return parseInt(vm.nbEmployeesInput() * vm.averageSalaryInput() * 1.31 * 0.05);
  }, this)
};

vm.savings = {
  absenteeism: ko.computed(function() {
    return beautifyAmount(vm.numericSavings.absenteeism());
  }, this),
  retention: ko.computed(function() {
    return beautifyAmount(vm.numericSavings.retention());
  }, this),
  hrTime: ko.computed(function() {
    return beautifyAmount(vm.numericSavings.hrTime());
  }, this),
  productivityIncrease: ko.computed(function() {
    return beautifyAmount(vm.numericSavings.productivityIncrease());
  }, this)
};

vm.totalSavings = ko.computed(function() {
  var amount = vm.numericSavings.absenteeism() + vm.numericSavings.retention() + vm.numericSavings.hrTime() + vm.numericSavings.productivityIncrease();
  return beautifyAmount(amount);
}, this);

vm.errors = ko.validation.group(vm);

ko.applyBindings(vm);