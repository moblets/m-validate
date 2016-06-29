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

/**
 * MValidate uses a Json to validate another Json.
 *
 * @class MValidate
 * @param {object} localesConfig Object with the localization config.
 * @param  {string} locale        The locale to be used
 * @constructor
 * @module MValidate
 * @example
 * ```javascript
 * var localesConfig = {
 *   locales: ['pt-BR', 'en-US', 'es-ES'],
 *   directory: './locales',
 *   extension: '.json'
 * };
 * var validator = new MValidate(localesConfig, 'pt-BR');
 * ```
 */
var MValidate = function(localesConfig, locale) {
  this.i18n = new Localization(localesConfig);
  this.i18n.setLocale(locale);
};

/**
 * Validate the content fields using the properties Json
 * @method validate
 * @param  {object} content    The Json with each field to be validated
 * @param  {Json} properties The Json with each field definition
 * @return {object}            An object with each validated field and the
 * found errors. If no error is found, an empty object is returned
 * @example
 **content** example:
 ```javascript
 var content = {
   password: "1234",
   title: "Hi there!",
   text: "Hello there",
   color: "#FFGG32",
   backgroundColor: ""
 };
 ```
 **properties** example:
 ```json
 "fields": [
   {
     "name": "password",
     "type": "number",
     "min-length": 6,
     "max-length": 30
   },
   {
     "name": "title",
     "type": "text",
     "min-length": 2,
     "max-length": 144,
     "string": "alphaSpace",
     "required": true
   },
   {
     "name": "text",
     "type": "text-area",
     "min-length": 2,
     "max-length": 3000,
     "string": "alphaSpace"
   },
   {
     "name": "color",
     "type": "color"
     "required": true
   },
   {
     "name": "backgroundColor",
     "type": "color"
     "required": true
   }
 ]
 ```
 Using this content with this validator and no translation you should get the
 following response:
 ```javascript
 {
  password: {
    min-length: 'must_be_min: 6'
  },
  title: {
    string: 'not_an_alpha_space'
  },
  text: {},
  color: {
    type: 'not_a_color'
  },
  backgroundColor: {
    required: 'field_is_required'
  }
 }
 ```

 * You can check how to create the translation Json in the [spec/locales](https://github.com/moblets/m-validate/tree/develop/spec/locales) folder.

 * Check all possible validations and usage in the [readme documentation](https://github.com/moblets/m-validate#m-validate).
 */
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
              var res = this.i18n.__n(
                  splitedResponse[0] + ': %f',
                  Number(splitedResponse[1])
                );

              if (!res) {
                res = this.i18n.__(
                  splitedResponse[0] + ': %f',
                  Number(splitedResponse[1])
                );
              }

              (response[fieldName])[rule] = res;
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

/**
MValidate module
@module MValidate
@class MValidate
@main MValidate
**/
module.exports = MValidate;
