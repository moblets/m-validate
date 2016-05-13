/* eslint-env jasmine */
var fs = require('fs');

describe('validation', function() {
  var validate = require('../m-validate.js');

  var definitionPath = './spec/form.json';
  var definitionContent = fs.readFileSync(definitionPath, 'utf8');
  var definition = JSON.parse(definitionContent);
  var definitionFields = definition.fields;

  it('it should respond with success for required fields', function() {
    var content = {
      password: "1234"
    };

    var result = validate(content, definitionFields);
    expect(result.password).toEqual({});
    expect(result.description).toEqual({});
    expect(result.quantity).toEqual({});
    expect(result.themeColor).toEqual({});
    expect(result.arrival).toEqual({});
  });

  it('should respond with errors for required fields', function() {
    var content = {
      birthDay: "1979-03-17"
    };

    var result = validate(content, definitionFields);
    expect(result.password.required).toBe('field_is_required');
    expect(result.birthDay).toEqual({});
  });
});
