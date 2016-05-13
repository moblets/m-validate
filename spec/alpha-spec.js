/* eslint-env jasmine */
var fs = require("fs");

describe('validation', function() {
  var validate = require('../m-validate.js');

  var definitionPath = './spec/form.json';
  var definitionContent = fs.readFileSync(definitionPath, 'utf8');
  var definition = JSON.parse(definitionContent);
  var definitionFields = definition.fields;

  it('should success with alpha only letters', function() {
    var content = {
      password: "1234",
      alpha: "qwerty"
    };

    var result = validate(content, definitionFields);
    expect(result.alpha).toEqual({});
  });

  it('should error with alpha begin with number', function() {
    var content = {
      password: "1234",
      alpha: "1qwerty"
    };
    var result = validate(content, definitionFields);
    expect(result.alpha.string).toBe("not_an_alpha");
  });

  it('should error with alpha end in number', function() {
    var content = {
      password: "1234",
      alpha: "qwerty1"
    };
    var result = validate(content, definitionFields);
    expect(result.alpha.string).toBe("not_an_alpha");
  });

  it('should error with alpha contain number', function() {
    var content = {
      password: "1234",
      alpha: "qwer2ty"
    };
    var result = validate(content, definitionFields);
    expect(result.alpha.string).toBe("not_an_alpha");
  });
});