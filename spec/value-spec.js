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
  }, 'pt-BR');

  var definitionPath = './spec/form.json';
  var definitionContent = fs.readFileSync(definitionPath, 'utf8');
  var definition = JSON.parse(definitionContent);
  var definitionFields = definition.fields;

  it('should respond with success for lessThan and moreThan', function() {
    var content = {
      password: "1234",
      zoom: "3"
    };

    var result = validator.validate(content, definitionFields);
    expect(result.error).toBe(false);
    expect(result.result.zoom).toEqual({});
  });
  it('should respond error for moreThan', function() {
    var content = {
      password: "1234",
      zoom: "0"
    };

    var result = validator.validate(content, definitionFields);
    expect(result.error).toBe(true);
    expect(result.result.zoom['more-than']).toBe('must_be_more_than: 1');
  });
  it('should respond error for moreThan (equal number)', function() {
    var content = {
      password: "1234",
      zoom: "1"
    };

    var result = validator.validate(content, definitionFields);
    expect(result.error).toBe(true);
    expect(result.result.zoom['more-than']).toBe('must_be_more_than: 1');
  });
  it('should respond with success for lessThan and moreThan (float)',
    function() {
      var content = {
        password: "1234",
        precision: "1.4"
      };

      var result = validator.validate(content, definitionFields);
      expect(result.error).toBe(false);
      expect(result.result.precision).toEqual({});
    });
  it('should respond error for moreThan (float)', function() {
    var content = {
      password: "1234",
      precision: 1
    };

    var result = validator.validate(content, definitionFields);
    expect(result.error).toBe(true);
    expect(result.result.precision['more-than']).toBe('must_be_more_than: 1.3');
  });
  it('should respond error for lessThan (float)', function() {
    var content = {
      password: "1234",
      precision: "1.91"
    };

    var result = validator.validate(content, definitionFields);
    expect(result.error).toBe(true);
    expect(result.result.precision['less-than']).toBe('must_be_less_than: 1.9');
  });


  it('should respond error for lessThan', function() {
    var content = {
      password: "1234",
      zoom: "15"
    };

    var result = validator.validate(content, definitionFields);
    expect(result.error).toBe(true);
    expect(result.result.zoom['less-than']).toBe('must_be_less_than: 10');
  });
  it('should respond error for lessThan (equal number)', function() {
    var content = {
      password: "1234",
      zoom: "10"
    };

    var result = validator.validate(content, definitionFields);
    expect(result.error).toBe(true);
    expect(result.result.zoom['less-than']).toBe('must_be_less_than: 10');
  });
  it('should respond with success for moreThanOrEqual (equal number)',
    function() {
      var content = {
        password: "1234",
        avenue: "1"
      };

      var result = validator.validate(content, definitionFields);
      expect(result.error).toBe(false);
      expect(result.result.avenue).toEqual({});
    });
  it('should respond with success for moreThanOrEqual (float)',
    function() {
      var content = {
        password: "1234",
        timePrecision: "0.001"
      };

      var result = validator.validate(content, definitionFields);
      expect(result.error).toBe(false);
      expect(result.result.timePrecision).toEqual({});
    });
  it('should respond error for moreThanOrEqual', function() {
    var content = {
      password: "1234",
      avenue: "0"
    };

    var result = validator.validate(content, definitionFields);
    expect(result.error).toBe(true);
    expect(result.result.avenue['more-than-or-equal'])
      .toBe('must_be_more_than_or_equal: 1');
  });
  it('should respond error for moreThanOrEqual (float)', function() {
    var content = {
      password: "1234",
      timePrecision: "0"
    };

    var result = validator.validate(content, definitionFields);
    expect(result.error).toBe(true);
    expect(result.result.timePrecision['more-than-or-equal'])
      .toBe('must_be_more_than_or_equal: 0.001');
  });
  it('should respond with success for lessThanOrEqual (equal number)',
    function() {
      var content = {
        password: "1234",
        avenue: "80"
      };

      var result = validator.validate(content, definitionFields);
      expect(result.error).toBe(false);
      expect(result.result.avenue).toEqual({});
    });
  it('should respond error for lessThanOrEqual', function() {
    var content = {
      password: "1234",
      avenue: "81"
    };

    var result = validator.validate(content, definitionFields);
    expect(result.error).toBe(true);
    expect(result.result.avenue['less-than-or-equal'])
      .toBe('must_be_less_than_or_equal: 80');
  });
  it('should respond error for lessThanOrEqual', function() {
    var content = {
      password: "1234",
      timePrecision: "0.3"
    };

    var result = validator.validate(content, definitionFields);
    expect(result.error).toBe(true);
    expect(result.result.timePrecision['less-than-or-equal'])
      .toBe('must_be_less_than_or_equal: 0.031');
  });
});
