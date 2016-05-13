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

  it('should respond with success for email type (russo@gmail.com.com.br)',
    function() {
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

  it('should respond with success for url type (fabapp.com)', function() {
    var content = {
      password: "1234",
      siteaddress: "http://fabapp.com/teste.com/br"
    };

    var result = validate(content, definitionFields);
    expect(result.siteaddress).toEqual({});
  });

  it('should respond with success for url type (e.russo.fab.mobi)', function() {
    var content = {
      password: "1234",
      siteaddress: "http://e.russo.fab.mobi.com.br.mobi/"
    };

    var result = validate(content, definitionFields);
    expect(result.siteaddress).toEqual({});
  });

  it('should respond with success for url type (query string)', function() {
    var content = {
      password: "1234",
      siteaddress: "http://m.app.vc/rlbaladas#/home?olar=teste&teste=olar"
    };

    var result = validate(content, definitionFields);
    expect(result.siteaddress).toEqual({});
  });

  it('should respond with success for url type (https)', function() {
    var content = {
      password: "1234",
      siteaddress: "https://universo.mobi"
    };

    var result = validate(content, definitionFields);
    expect(result.siteaddress).toEqual({});
  });

  it('should respond with success for url type (https)', function() {
    var content = {
      password: "1234",
      siteaddress: "http://g.google"
    };

    var result = validate(content, definitionFields);
    expect(result.siteaddress).toEqual({});
  });

  it('should respond with error for url type (without http)', function() {
    var content = {
      password: "1234",
      siteaddress: "russo.fabapp.com"
    };

    var result = validate(content, definitionFields);
    expect(result.siteaddress).toEqual({});
  });

  it('should respond with error for url type (.com)', function() {
    var content = {
      password: "1234",
      siteaddress: "http://.com"
    };

    var result = validate(content, definitionFields);
    expect(result.siteaddress.type).toBe('not_an_url');
  });

  it('should respond with error for url type (query string)', function() {
    var content = {
      password: "1234",
      siteaddress: "http://test.com?query=false?repeat=question"
    };

    var result = validate(content, definitionFields);
    expect(result.siteaddress).toEqual({});
  });

  it('should respond with error for tel type (multiple)', function() {
    var content = {
      password: "1234",
      phone1: "551199999999",
      phone2: "+55 11 995277809",
      phone3: "55 11 99527-7809",
      phone4: "+55 (011 995277809",
      phone5: "55 (11) 99527-7809",
      phone6: "(11) 995277809",
      phone7: "(11) 99527-7809",
      phone8: "11 99527-7809",
      phone9: "99527-7809",
      phone10: "995277809",
      phone11: "9999  9999"
    };

    var result = validate(content, definitionFields);
    expect(result.phone1).toEqual({});
    expect(result.phone2).toEqual({});
    expect(result.phone3).toEqual({});
    expect(result.phone4).toEqual({});
    expect(result.phone5).toEqual({});
    expect(result.phone6).toEqual({});
    expect(result.phone7).toEqual({});
    expect(result.phone8).toEqual({});
    expect(result.phone9).toEqual({});
    expect(result.phone10).toEqual({});
    expect(result.phone11).toEqual({});
  });

  it('should respond with error for tel type (multiple)', function() {
    var content = {
      password: "1234",
      phone1: "11 abc-18271",
      phone2: "-",
      phone3: "(",
      phone4: ")",
      phone5: "a",
      phone6: "12345=",
      phone7: "]",
      phone8: "asdf",
      phone9: " ",
      phone10: "9786obtu",
      phone11: "kla urg"
    };

    var result = validate(content, definitionFields);
    expect(result.phone1.type).toBe('not_a_tel');
    expect(result.phone2.type).toBe('not_a_tel');
    expect(result.phone3.type).toBe('not_a_tel');
    expect(result.phone4.type).toBe('not_a_tel');
    expect(result.phone5.type).toBe('not_a_tel');
    expect(result.phone6.type).toBe('not_a_tel');
    expect(result.phone7.type).toBe('not_a_tel');
    expect(result.phone8.type).toBe('not_a_tel');
    expect(result.phone9.type).toBe('not_a_tel');
    expect(result.phone10.type).toBe('not_a_tel');
    expect(result.phone11.type).toBe('not_a_tel');
  });
});
