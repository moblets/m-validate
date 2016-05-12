/* eslint-env jasmine */
var fs = require('fs');

describe('validation', function() {
  var validate = require('../m-validate.js');

  var definitionPath = './spec/form.json';
  var definitionContent = fs.readFileSync(definitionPath, 'utf8');
  var definition = JSON.parse(definitionContent);
  var definitionFields = definition.fields;

  it('type should respond with success', function() {
    var content = {
      password: "1234",
      description: "A cada 9 almoços, ganhe o 10º, com bebida e sobremesa!",
      quantity: "2"
    };

    var result = validate(content, definitionFields);
    expect(result.code).toBe(200);
    expect(result.password).toEqual({});
  });
});
