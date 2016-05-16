/* eslint-env jasmine */
var fs = require("fs");

describe('validation', function() {
  var validate = require('../m-validate.js');

  var definitionPath = './spec/form.json';
  var definitionContent = fs.readFileSync(definitionPath, 'utf8');
  var definition = JSON.parse(definitionContent);
  var definitionFields = definition.fields;

  it('should respond with success with alpha', function() {
    var content = {
      password: "1234",
      userAlpha: "Éros"
    };

    var result = validate(content, definitionFields);
    expect(result.error).toBe(false);
    expect(result.result.userAlpha).toEqual({});
  });

  it('should respond with error with alpha', function() {
    var content = {
      password: "1234",
      userAlpha: "Olar amigo"
    };

    var result = validate(content, definitionFields);
    expect(result.error).toBe(true);
    expect(result.result.userAlpha.string).toBe('not_an_alpha');
  });

  it('should respond with success with alphaSpace', function() {
    var content = {
      password: "1234",
      userAlphaSpace: "Éros Ramaroti Jr"
    };

    var result = validate(content, definitionFields);
    expect(result.error).toBe(false);
    expect(result.result.userAlphaSpace).toEqual({});
  });

  it('should respond with error with alphaSpace', function() {
    var content = {
      password: "1234",
      userAlphaSpace: "Éros Ramaroti 1"
    };

    var result = validate(content, definitionFields);
    expect(result.error).toBe(true);
    expect(result.result.userAlphaSpace.string).toBe('not_an_alpha_space');
  });

  it('should respond with success with alphaDash', function() {
    var content = {
      password: "1234",
      userAlphaDash: "Éros-Ramaroti_Jr"
    };

    var result = validate(content, definitionFields);
    expect(result.error).toBe(false);
    expect(result.result.userAlphaDash).toEqual({});
  });

  it('should respond with error with alphaDash', function() {
    var content = {
      password: "1234",
      userAlphaDash: "Éros–Ramaroti"
    };

    var result = validate(content, definitionFields);
    expect(result.error).toBe(true);
    expect(result.result.userAlphaDash.string).toBe('not_an_alpha_dash');
  });

  it('should respond with success with alphaSymbol', function() {
    var content = {
      password: "1234",
      userAlphaSymbol: "Éros&Ramaroti_Jr!?"
    };

    var result = validate(content, definitionFields);
    expect(result.error).toBe(false);
    expect(result.result.userAlphaSymbol).toEqual({});
  });

  it('should respond with error with alphaSymbol', function() {
    var content = {
      password: "1234",
      userAlphaSymbol: "Éros–Ramaroti†¥"
    };

    var result = validate(content, definitionFields);
    expect(result.error).toBe(true);
    expect(result.result.userAlphaSymbol.string).toBe('not_an_alpha_symbol');
  });

  it('should respond with success with alphaNumeric', function() {
    var content = {
      password: "1234",
      userAlphaNumeric: "ContandoÉ1234"
    };

    var result = validate(content, definitionFields);
    expect(result.error).toBe(false);
    expect(result.result.userAlphaNumeric).toEqual({});
  });

  it('should respond with error with alphaNumeric', function() {
    var content = {
      password: "1234",
      userAlphaNumeric: "Contando,queÉ1234"
    };

    var result = validate(content, definitionFields);
    expect(result.error).toBe(true);
    expect(result.result.userAlphaNumeric.string).toBe('not_an_alpha_numeric');
  });

  it('should respond with success with alphaNumericSpace', function() {
    var content = {
      password: "1234",
      userAlphaNumericSpace: "Contando que É 1234"
    };

    var result = validate(content, definitionFields);
    expect(result.error).toBe(false);
    expect(result.result.userAlphaNumericSpace).toEqual({});
  });

  it('should respond with error with alphaNumericSpace', function() {
    var content = {
      password: "1234",
      userAlphaNumericSpace: "Contando, que É 1234"
    };

    var result = validate(content, definitionFields);
    expect(result.error).toBe(true);
    expect(result.result.userAlphaNumericSpace.string)
      .toBe('not_an_alpha_numeric_space');
  });

  it('should respond with success with alphaNumericDash', function() {
    var content = {
      password: "1234",
      userAlphaNumericDash: "Contando-que_É-1234"
    };

    var result = validate(content, definitionFields);
    expect(result.error).toBe(false);
    expect(result.result.userAlphaNumericDash).toEqual({});
  });

  it('should respond with error with alphaNumericDash', function() {
    var content = {
      password: "1234",
      userAlphaNumericDash: "Contando que-É_1234"
    };

    var result = validate(content, definitionFields);
    expect(result.error).toBe(true);
    expect(result.result.userAlphaNumericDash.string)
      .toBe('not_an_alpha_numeric_dash');
  });

  it('should respond with success with alphaNumericSymbol', function() {
    var content = {
      password: "1234",
      userAlphaNumericSymbol: "Contando que &É 1234!"
    };

    var result = validate(content, definitionFields);
    expect(result.error).toBe(false);
    expect(result.result.userAlphaNumericSymbol).toEqual({});
  });

  it('should respond with error with alphaNumericSymbol', function() {
    var content = {
      password: "1234",
      userAlphaNumericSymbol: "Contando que É ¬ 1234"
    };

    var result = validate(content, definitionFields);
    expect(result.error).toBe(true);
    expect(result.result.userAlphaNumericSymbol.string)
      .toBe('not_an_alpha_numeric_symbol');
  });

  it('should respond with success with numeric', function() {
    var content = {
      password: "1234",
      userNumeric: "1234"
    };

    var result = validate(content, definitionFields);
    expect(result.error).toBe(false);
    expect(result.result.userNumeric).toEqual({});
  });

  it('should respond with error with numeric', function() {
    var content = {
      password: "1234",
      userNumeric: "1.234"
    };

    var result = validate(content, definitionFields);
    expect(result.error).toBe(true);
    expect(result.result.userNumeric.string).toBe('not_a_numeric');
  });

  it('should respond with success with numericFloat', function() {
    var content = {
      password: "1234",
      userNumericFloat: "1.23,4"
    };

    var result = validate(content, definitionFields);
    expect(result.error).toBe(false);
    expect(result.result.userNumericFloat).toEqual({});
  });

  it('should respond with error with numericFloat', function() {
    var content = {
      password: "1234",
      userNumericFloat: "1,234-"
    };

    var result = validate(content, definitionFields);
    expect(result.error).toBe(true);
    expect(result.result.userNumericFloat.string).toBe('not_a_numeric_float');
  });

  it('should respond with success with numericDash', function() {
    var content = {
      password: "1234",
      userNumericDash: "1.23-4"
    };

    var result = validate(content, definitionFields);
    expect(result.error).toBe(false);
    expect(result.result.userNumericDash).toEqual({});
  });

  it('should respond with error with numericDash', function() {
    var content = {
      password: "1234",
      userNumericDash: "1,234 -"
    };

    var result = validate(content, definitionFields);
    expect(result.error).toBe(true);
    expect(result.result.userNumericDash.string).toBe('not_a_numeric_dash');
  });

  it('should respond with success with numericSymbol', function() {
    var content = {
      password: "1234",
      userNumericSymbol: "1.23-4?!&"
    };

    var result = validate(content, definitionFields);
    expect(result.error).toBe(false);
    expect(result.result.userNumericSymbol).toEqual({});
  });

  it('should respond with error with numericSymbol', function() {
    var content = {
      password: "1234",
      userNumericSymbol: "1,234 ∆"
    };

    var result = validate(content, definitionFields);
    expect(result.error).toBe(true);
    expect(result.result.userNumericSymbol.string).toBe('not_a_numeric_symbol');
  });
});
