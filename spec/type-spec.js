/* eslint-env jasmine */
var fs = require('fs');

describe('validation', function() {
  var validate = require('../m-validate.js');

  var definitionPath = './spec/form.json';
  var definitionContent = fs.readFileSync(definitionPath, 'utf8');
  var definition = JSON.parse(definitionContent);
  var definitionFields = definition.fields;

  it('should respond with success for number type', function() {
    var content = {
      password: "1234"
    };

    var result = validate(content, definitionFields);
    expect(result.password).toEqual({});
  });

  it('should respond with error for numbertype', function() {
    var content = {
      password: "12s4"
    };

    var result = validate(content, definitionFields);
    expect(result.password.type).toBe('not_a_number');
  });

  it('should respond with success for select type', function() {
    var content = {
      password: "1234",
      quantity: "2"
    };

    var result = validate(content, definitionFields);
    expect(result.quantity).toEqual({});
  });

  it('should respond with error for select type', function() {
    var content = {
      password: "1234",
      quantity: "5"
    };

    var result = validate(content, definitionFields);
    expect(result.quantity.type).toBe('not_in_the_select_list');
  });

  it('should respond with success for color type', function() {
    var content = {
      password: "1234",
      themeColor: "#FF12cc"
    };

    var result = validate(content, definitionFields);
    expect(result.themeColor).toEqual({});
  });

  it('should respond with error for color type', function() {
    var content = {
      password: "1234",
      themeColor: "#123"
    };

    var result = validate(content, definitionFields);
    expect(result.themeColor.type).toBe('not_a_color');
  });

  it('should respond with success for date type', function() {
    var content = {
      password: "1234",
      birthDay: "1979-03-17"
    };

    var result = validate(content, definitionFields);
    expect(result.birthDay).toEqual({});
  });

  it('should respond with error for date type', function() {
    var content = {
      password: "1234",
      birthDay: "17/03/1979"
    };

    var result = validate(content, definitionFields);
    expect(result.birthDay.type).toBe('not_a_date');
  });

  it('should respond with error for date type (31/04)', function() {
    var content = {
      password: "1234",
      birthDay: "2016-04-31 "
    };

    var result = validate(content, definitionFields);
    expect(result.birthDay.type).toBe('not_a_date');
  });

  it('should respond with success for time type (03:14)', function() {
    var content = {
      password: "1234",
      arrival: "03:14"
    };

    var result = validate(content, definitionFields);
    expect(result.arrival).toEqual({});
  });

  it('should respond with error for time type (24:14)', function() {
    var content = {
      password: "1234",
      arrival: "24:14"
    };

    var result = validate(content, definitionFields);
    expect(result.arrival.type).toBe('not_a_time');
  });

  it('should respond with success for time type (3:14)', function() {
    var content = {
      password: "1234",
      arrival: "3:14"
    };

    var result = validate(content, definitionFields);
    expect(result.arrival).toEqual({});
  });

  it('should respond with success for time type (03:14)', function() {
    var content = {
      password: "1234",
      arrival: "03:14"
    };

    var result = validate(content, definitionFields);
    expect(result.arrival).toEqual({});
  });

  it('should respond with success for email type (russo@gmail.co)', function() {
    var content = {
      password: "1234",
      email: "russo@gmail.co"
    };

    var result = validate(content, definitionFields);
    expect(result.email).toEqual({});
  });

  it('should respond with success for email type (russo@gmail.com.com.br)', function() {
    var content = {
      password: "1234",
      email: "russo@gmail.com.com.br"
    };

    var result = validate(content, definitionFields);
    expect(result.email).toEqual({});
  });

  it('should respond with success for email type (r@mob.cc)', function() {
    var content = {
      password: "1234",
      email: "r@mob.cc"
    };

    var result = validate(content, definitionFields);
    expect(result.email).toEqual({});
  });

  it('should respond with error for email type', function() {
    var content = {
      password: "1234",
      email: "russo@fabapp"
    };

    var result = validate(content, definitionFields);
    expect(result.email.type).toBe('not_an_email');
  });
});
