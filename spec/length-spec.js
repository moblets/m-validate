/* eslint-env jasmine */
var fs = require('fs');

describe('validation', function() {
  var MValidate = require('../m-validate');
  var validator = new MValidate({
    locales: [
      'en-US',
      'pt-BR'
    ],
    directory: './spec/locales',
    extension: '.json'
  }, 'en-US');

  var definitionPath = './spec/form.json';
  var definitionContent = fs.readFileSync(definitionPath, 'utf8');
  var definition = JSON.parse(definitionContent);
  var definitionFields = definition.fields;

  it('should respond success for password max and min length', function() {
    var content = {
      password: "1246"
    };
    var result = validator.validate(content, definitionFields);
    expect(result.error).toBe(false);
    expect(result.result.password).toEqual({});
  });

  it('should respond with error for password max-length', function() {
    var content = {
      password: "12456"
    };

    var result = validator.validate(content, definitionFields);
    expect(result.error).toBe(true);
    expect(result.result.password['max-length'])
      .toBe('must_be_max: 4');
  });

  it('should respond with error for password min-length', function() {
    var content = {
      password: "124"
    };

    var result = validator.validate(content, definitionFields);
    expect(result.error).toBe(true);
    expect(result.result.password['min-length'])
      .toBe('must_be_min: 4');
  });
});
