/* eslint-env jasmine */
var fs = require('fs');

describe('validation', function() {
  var validate = require('../m-validate.js');

  var definitionPath = './spec/form.json';
  var definitionContent = fs.readFileSync(definitionPath, 'utf8');
  var definition = JSON.parse(definitionContent);
  var definitionFields = definition.fields;

  it('it should respond with success for number type', function() {
    var content = {
      password: "1234"
    };

    var result = validate(content, definitionFields);
    expect(result.code).toBe(200);
    expect(result.password).toEqual({});
  });

  it('it should respond with error for numbertype', function() {
    var content = {
      password: "12s4"
    };

    var result = validate(content, definitionFields);
    expect(result.code).toBe(400);
    expect(result.password.type).toBe('not_a_number');
  });

  it('it should respond with success for select type', function() {
    var content = {
      password: "1234",
      quantity: "2"
    };

    var result = validate(content, definitionFields);
    expect(result.code).toBe(200);
    expect(result.quantity).toEqual({});
  });

  it('it should respond with error for select type', function() {
    var content = {
      password: "1234",
      quantity: "5"
    };

    var result = validate(content, definitionFields);
    expect(result.code).toBe(400);
    expect(result.quantity.type).toBe('not_in_the_select_list');
  });

  it('it should respond with success for color type', function() {
    var content = {
      password: "1234",
      themeColor: "#FF12cc"
    };

    var result = validate(content, definitionFields);
    expect(result.code).toBe(200);
    expect(result.themeColor).toEqual({});
  });

  it('it should respond with error for color type', function() {
    var content = {
      password: "1234",
      themeColor: "#123"
    };

    var result = validate(content, definitionFields);
    expect(result.code).toBe(400);
    expect(result.themeColor.type).toBe('not_a_color');
  });

  it('it should respond with success for date type', function() {
    var content = {
      password: "1234",
      birthDay: "1979-03-17"
    };

    var result = validate(content, definitionFields);
    expect(result.code).toBe(200);
    expect(result.birthDay).toEqual({});
  });

  it('it should respond with error for date type', function() {
    var content = {
      password: "1234",
      birthDay: "17/03/1979"
    };

    var result = validate(content, definitionFields);
    expect(result.code).toBe(400);
    expect(result.birthDay.type).toBe('not_a_date');
  });
});
