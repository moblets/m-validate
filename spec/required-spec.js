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

  it('it should respond with success for required fields', function() {
    var content = {
      password: "1234"
    };

    var result = validator.validate(content, definitionFields);
    expect(result.error).toBe(false);
    expect(result.result.password).toEqual({});
    expect(result.result.description).toEqual({});
    expect(result.result.quantity).toEqual({});
    expect(result.result.themeColor).toEqual({});
    expect(result.result.arrival).toEqual({});
  });

  it('should respond with errors for required fields', function() {
    var content = {
      birthDay: "1979-03-17"
    };

    var result = validator.validate(content, definitionFields);
    expect(result.error).toBe(true);
    expect(result.result.password.required).toBe('field_is_required');
    expect(result.result.birthDay).toEqual({});
  });
});
