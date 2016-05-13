# m-validate

[![npm](https://img.shields.io/npm/v/npm.svg?maxAge=2592000&style=flat-square)](https://www.npmjs.com/package/m-validate)
[![npm](https://img.shields.io/npm/dt/express.svg?maxAge=2592000&style=flat-square)](https://www.npmjs.com/package/m-validate)
![stars](https://img.shields.io/github/stars/moblets/m-validate.svg?style=flat-square)
![license](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)

Moblets' NodeJS simple validation to validate data based on a deffinition JSon.

## Installation

```
$ npm install --save m-validate
```

## Pre requisites

You must have a definition json like this:

```json
{
  "fields": [
    {
      "name": "name",
      "type": "text",
      "min-length": 3
    },
    {
      "name": "password",
      "type": "number",
      "max-length": 4,
      "min-length": 4,
      "required": true
    },
    {
      "name": "description",
      "type": "text-area"
    },
    {
      "name": "quantity",
      "type": "select",
      "values": {
        "0": "value_3",
        "1": "value_6",
        "2": "value_9"
      }
    },
    {
      "name": "themeColor",
      "type": "color"
    },
    {
      "name": "birthDay",
      "type": "date"
    },
    {
      "name": "arrival",
      "type": "time"
    }
  ]
}
```

This definition must have all the fields and the validations.

And you must have the data to be validated:

```json
{
  "password": "1232",
  "description": "A great fidelity card",
  "quantity": "0"
}
```

## Usage

Just call the validation with the definition and the data:

```javascript
// Get the definition json here
var validate = require('m-validate');
var fs = require('fs');

var definitionPath = 'form.json';
var definitionContent = fs.readFileSync(definitionPath, 'utf8');
var definition = JSON.parse(definitionContent);
var definitionFields = definition.fields;

// Assuming the data comes from a post
var content = req.body;

// Response variable will have the result
var response = validate(content, mobletDefinitionFields);
```

## License

The MIT License (MIT)

Copyright (c) 2016 Moblets

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
