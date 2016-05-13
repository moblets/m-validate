/* eslint-env jasmine */
var fs = require('fs');

describe('validation', function() {
  var validate = require('../m-validate.js');

  var definitionPath = './spec/form.json';
  var definitionContent = fs.readFileSync(definitionPath, 'utf8');
  var definition = JSON.parse(definitionContent);
  var definitionFields = definition.fields;

  it('should respond with password max-length errors', function() {
    var content = {
      password: "12456"
    };

    var result = validate(content, definitionFields);
    expect(result.password['max-length']).toBe('must_be_more_than_chars: 4');
    expect(result.description).toEqual({});
  });

  it('should respond with password min-length errors', function() {
    var content = {
      password: "124"
    };

    var result = validate(content, definitionFields);
    expect(result.password['min-length']).toBe('must_be_at_least_chars: 4');
    expect(result.description).toEqual({});
  });
});
