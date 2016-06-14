var Localization = require('i18n-2');

var length = require('./validations/length.js');
var required = require('./validations/required.js');
var string = require('./validations/string.js');
var type = require('./validations/type.js');
var value = require('./validations/value.js');

var validations = {
  type: type,
  minLength: length.min,
  maxLength: length.max,
  required: required,
  string: string,
  lessThan: value.lessThan,
  lessThanOrEqual: value.lessThanOrEqual,
  moreThan: value.moreThan,
  moreThanOrEqual: value.moreThanOrEqual
};

var MValidate = function(localesConfig, locale) {
  this.i18n = new Localization(localesConfig);
  this.i18n.setLocale(locale);
};

MValidate.prototype.validate = function(content, properties) {
  var error = false;
  var response = {};
    // Iterate the array with the PROPERTIES
  for (var i = 0; i < properties.length; i++) {
    var property = properties[i];

      // Iterate the RULES of a PROPERTY
    for (var rule in property) {
      if (property.hasOwnProperty(rule)) {
        var fieldName = property.name;

          // Create the object for the results of a property
        if (typeof response[fieldName] === 'undefined') {
          response[fieldName] = {};
        }

          // Convert the rule to camelCase to respect Google Style
        var ccRule = rule.replace(/-([a-z])/g, function(g) {
          return g[1].toUpperCase();
        });

          // Validate all rules existing in the validation functions
          // Ignore "name" and keys that don't have a validation deffined
        if (
            rule !== 'name' &&
            typeof validations[ccRule] !== 'undefined') {
          var validationResult = validations[ccRule](
              property[rule],
              content[fieldName],
              property.values
            );
          if (validationResult !== true) {
            var splitedResponse = validationResult.split(': ');
            if (splitedResponse.length > 1) {
              (response[fieldName])[rule] = this.i18n
                .__(splitedResponse[0] + ': %s', splitedResponse[1]);
            } else {
              (response[fieldName])[rule] = this.i18n
              .__(validationResult);
            }
            error = true;
          }
        }
      }
    }
  }
  return {
    error: error,
    result: response
  };
};

module.exports = MValidate;
