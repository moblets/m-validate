/* eslint-env jasmine */
var fs = require("fs");

describe('validation', function() {
  var validate = require('../m-validate.js');

  var definitionPath = './spec/form.json';
  var definitionContent = fs.readFileSync(definitionPath, 'utf8');
  var definition = JSON.parse(definitionContent);
  var definitionFields = definition.fields;

  it("should success to image format jpg", function() {
    var content = {
      password: "1234",
      file: "file.jpg"
    };

    var result = validate(content, definitionFields);
    console.log(result);
    expect(result.file).toEqual({});
  });

  it("should success to image format jpeg", function() {
    var content = {
      password: "1234",
      file: "file.jpeg"
    };

    var result = validate(content, definitionFields);
    expect(result.file).toEqual({});
  });

  it("should success to image format png", function() {
    var content = {
      password: "1234",
      file: "file.png"
    };

    var result = validate(content, definitionFields);
    expect(result.file).toEqual({});
  });

  it("should error to image without format", function() {
    var content = {
      password: "1234",
      file: "file"
    };

    var result = validate(content, definitionFields);
    expect(result.file.file).toBe("not_an_file_extension");
  });
});
