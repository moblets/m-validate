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
    expect(result.error).toBe(false);
    expect(result.result.password).toEqual({});
  });

  it('should respond with error for numbertype', function() {
    var content = {
      password: "12s4"
    };

    var result = validate(content, definitionFields);
    expect(result.error).toBe(true);
    expect(result.result.password.type).toBe('not_a_number');
  });

  it('should respond with success for select type', function() {
    var content = {
      password: "1234",
      quantity: "2"
    };

    var result = validate(content, definitionFields);
    expect(result.error).toBe(false);
    expect(result.result.quantity).toEqual({});
  });

  it('should respond with error for select type', function() {
    var content = {
      password: "1234",
      quantity: "5"
    };

    var result = validate(content, definitionFields);
    expect(result.error).toBe(true);
    expect(result.result.quantity.type).toBe('not_in_the_select_list');
  });

  it('should respond with success for radio type', function() {
    var content = {
      password: "1234",
      position: "right"
    };

    var result = validate(content, definitionFields);
    expect(result.error).toBe(false);
    expect(result.result.position).toEqual({});
  });

  it('should respond with error for radio type', function() {
    var content = {
      password: "1234",
      position: "top"
    };

    var result = validate(content, definitionFields);
    expect(result.error).toBe(true);
    expect(result.result.position.type).toBe('not_in_the_radio_list');
  });

  it('should respond with success for checkbox type', function() {
    var content = {
      password: "1234",
      color: "green"
    };

    var result = validate(content, definitionFields);
    expect(result.error).toBe(false);
    expect(result.result.color).toEqual({});
  });

  it('should respond with error for checkbox type', function() {
    var content = {
      password: "1234",
      color: "black"
    };

    var result = validate(content, definitionFields);
    expect(result.error).toBe(true);
    expect(result.result.color.type).toBe('not_in_the_checkbox_list');
  });

  it('should respond with success for color type', function() {
    var content = {
      password: "1234",
      themeColor: "#FF12cc"
    };

    var result = validate(content, definitionFields);
    expect(result.error).toBe(false);
    expect(result.result.themeColor).toEqual({});
  });

  it('should respond with error for color type', function() {
    var content = {
      password: "1234",
      themeColor: "#123"
    };

    var result = validate(content, definitionFields);
    expect(result.error).toBe(true);
    expect(result.result.themeColor.type).toBe('not_a_color');
  });

  it('should respond with success for date type', function() {
    var content = {
      password: "1234",
      birthDay: "1979-03-17"
    };

    var result = validate(content, definitionFields);
    expect(result.error).toBe(false);
    expect(result.result.birthDay).toEqual({});
  });

  it('should respond with error for date type', function() {
    var content = {
      password: "1234",
      birthDay: "17/03/1979"
    };

    var result = validate(content, definitionFields);
    expect(result.error).toBe(true);
    expect(result.result.birthDay.type).toBe('not_a_date');
  });

  it('should respond with error for date type (31/04)', function() {
    var content = {
      password: "1234",
      birthDay: "2016-04-31 "
    };

    var result = validate(content, definitionFields);
    expect(result.error).toBe(true);
    expect(result.result.birthDay.type).toBe('not_a_date');
  });

  it('should respond with success for time type (03:14)', function() {
    var content = {
      password: "1234",
      arrival: "03:14"
    };

    var result = validate(content, definitionFields);
    expect(result.error).toBe(false);
    expect(result.result.arrival).toEqual({});
  });

  it('should respond with error for time type (24:14)', function() {
    var content = {
      password: "1234",
      arrival: "24:14"
    };

    var result = validate(content, definitionFields);
    expect(result.error).toBe(true);
    expect(result.result.arrival.type).toBe('not_a_time');
  });

  it('should respond with success for time type (3:14)', function() {
    var content = {
      password: "1234",
      arrival: "3:14"
    };

    var result = validate(content, definitionFields);
    expect(result.error).toBe(false);
    expect(result.result.arrival).toEqual({});
  });

  it('should respond with success for time type (03:14)', function() {
    var content = {
      password: "1234",
      arrival: "03:14"
    };

    var result = validate(content, definitionFields);
    expect(result.error).toBe(false);
    expect(result.result.arrival).toEqual({});
  });

  it('should respond with success for email type (russo@gmail.co)', function() {
    var content = {
      password: "1234",
      email: "russo@gmail.co"
    };

    var result = validate(content, definitionFields);
    expect(result.error).toBe(false);
    expect(result.result.email).toEqual({});
  });

  it('should respond with success for email type (russo@gmail.com.com.br)',
    function() {
      var content = {
        password: "1234",
        email: "russo@gmail.com.com.br"
      };

      var result = validate(content, definitionFields);
      expect(result.error).toBe(false);
      expect(result.result.email).toEqual({});
    });

  it('should respond with success for email type (r@mob.cc)', function() {
    var content = {
      password: "1234",
      email: "r@mob.cc"
    };

    var result = validate(content, definitionFields);
    expect(result.error).toBe(false);
    expect(result.result.email).toEqual({});
  });

  it('should respond with error for email type', function() {
    var content = {
      password: "1234",
      email: "russo@fabapp"
    };

    var result = validate(content, definitionFields);
    expect(result.error).toBe(true);
    expect(result.result.email.type).toBe('not_an_email');
  });

  it('should respond with success for url type (fabapp.com)', function() {
    var content = {
      password: "1234",
      siteaddress: "http://fabapp.com/teste.com/br"
    };

    var result = validate(content, definitionFields);
    expect(result.error).toBe(false);
    expect(result.result.siteaddress).toEqual({});
  });

  it('should respond with success for url type (e.russo.fab.mobi)', function() {
    var content = {
      password: "1234",
      siteaddress: "http://e.russo.fab.mobi.com.br.mobi/"
    };

    var result = validate(content, definitionFields);
    expect(result.error).toBe(false);
    expect(result.result.siteaddress).toEqual({});
  });

  it('should respond with success for url type (query string)', function() {
    var content = {
      password: "1234",
      siteaddress: "http://m.app.vc/rlbaladas#/home?olar=teste&teste=olar"
    };

    var result = validate(content, definitionFields);
    expect(result.error).toBe(false);
    expect(result.result.siteaddress).toEqual({});
  });

  it('should respond with success for url type (https)', function() {
    var content = {
      password: "1234",
      siteaddress: "https://universo.mobi"
    };

    var result = validate(content, definitionFields);
    expect(result.error).toBe(false);
    expect(result.result.siteaddress).toEqual({});
  });

  it('should respond with success for url type (https)', function() {
    var content = {
      password: "1234",
      siteaddress: "http://g.google"
    };

    var result = validate(content, definitionFields);
    expect(result.error).toBe(false);
    expect(result.result.siteaddress).toEqual({});
  });

  it('should respond with error for url type (without http)', function() {
    var content = {
      password: "1234",
      siteaddress: "russo.fabapp.com"
    };

    var result = validate(content, definitionFields);
    expect(result.error).toBe(true);
    expect(result.result.siteaddress.type).toBe('not_an_url');
  });

  it('should respond with error for url type (.com)', function() {
    var content = {
      password: "1234",
      siteaddress: "http://.com"
    };

    var result = validate(content, definitionFields);
    expect(result.error).toBe(true);
    expect(result.result.siteaddress.type).toBe('not_an_url');
  });

  it('should respond with success for url type (query string)', function() {
    var content = {
      password: "1234",
      siteaddress: "http://test.com?query=false?repeat=question"
    };

    var result = validate(content, definitionFields);
    expect(result.error).toBe(false);
    expect(result.result.siteaddress).toEqual({});
  });

  it('should respond with success for tel type (multiple)', function() {
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
    expect(result.error).toBe(false);
    expect(result.result.phone1).toEqual({});
    expect(result.result.phone2).toEqual({});
    expect(result.result.phone3).toEqual({});
    expect(result.result.phone4).toEqual({});
    expect(result.result.phone5).toEqual({});
    expect(result.result.phone6).toEqual({});
    expect(result.result.phone7).toEqual({});
    expect(result.result.phone8).toEqual({});
    expect(result.result.phone9).toEqual({});
    expect(result.result.phone10).toEqual({});
    expect(result.result.phone11).toEqual({});
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
    expect(result.error).toBe(true);
    expect(result.result.phone1.type).toBe('not_a_tel');
    expect(result.result.phone2.type).toBe('not_a_tel');
    expect(result.result.phone3.type).toBe('not_a_tel');
    expect(result.result.phone4.type).toBe('not_a_tel');
    expect(result.result.phone5.type).toBe('not_a_tel');
    expect(result.result.phone6.type).toBe('not_a_tel');
    expect(result.result.phone7.type).toBe('not_a_tel');
    expect(result.result.phone8.type).toBe('not_a_tel');
    expect(result.result.phone9.type).toBe('not_a_tel');
    expect(result.result.phone10.type).toBe('not_a_tel');
    expect(result.result.phone11.type).toBe('not_a_tel');
  });
});
