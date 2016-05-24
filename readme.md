# m-validate

[![npm](https://img.shields.io/npm/v/npm.svg?maxAge=2592000&style=flat-square)](https://www.npmjs.com/package/m-validate)
[![npm](https://img.shields.io/npm/dt/express.svg?maxAge=2592000&style=flat-square)](https://www.npmjs.com/package/m-validate)
![stars](https://img.shields.io/github/stars/moblets/m-validate.svg?style=flat-square)
![license](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)

Moblets' NodeJS simple validation to validate data based on a definition JSon.

## Installation

```
$ npm install --save m-validate
```

## Available validations
Validations were created for **input type**, **length**, **required** and **string**.

### Input type validation
These are all HTML 5 input type validations.

#### number
Check input type number for integers.

**Usage**

Definition JSon
```json
{
  "name": "Number of friends",
  "type": "number"
}
```

**Error response:** *not_a_number*

#### select, radio and checkbox
Check if the response belongs to the possible values.

**Usage**

Definition JSon

```json
{
  "name": "position",
  "type": "radio",
  "values": {
    "left": "value_left",
    "right": "value_right",
    "up": "value_up",
    "down": "value_down"
  }
}
```
If the value is _left, right, up or down_, it will be validated.

**Error response:** *not_in_the_select_list*, *not_in_the_radio_list* or *not_in_the_checkbox_list*

#### color
Check if the response is a valid HTML 5, hexadecimal color, like '#FF0033'.

**Usage**

Definition JSon
```json
{
  "name": "themeColor",
  "type": "color"
}
```

**Error response:** *not_a_color*

#### date
Check if the response is a valid HTML 5, 'YYYY-MM-DD' date.

**Usage**

Definition JSon
```json
{
  "name": "birthDay",
  "type": "date"
}
```
**Error response:** *not_a_date*

#### time
Check if the response is a valid HTML 5, 'H:mm' time.

**Usage**

Definition JSon
```json
{
  "name": "arrival",
  "type": "time"
}
```
**Error response:** *not_a_time*

#### email
Check if the response is a valid email.

**Usage**

Definition JSon
```json
{
  "name": "userEmail",
  "type": "email"
}
```
**Error response:** *not_an_email*

#### url
Check if the response is a valid url.

**Usage**

Definition JSon
```json
{
  "name": "siteUrl",
  "type": "url"
}
```
**Error response:** *not_an_url*

#### tel
Check if the response is a phone. It's a generic phone validator that accepts international (with plus sign) and local phones (with or without paranthesis).

**Usage**

Definition JSon
```json
{
  "name": "cellNumber",
  "type": "tel"
}
```
**Error response:** *not_a_tel*

### Value validation
These four validations are for numbers to define it's min and max values.

#### lessThan and moreThan
These validations require the data to be a number (int or float) that is 'less than' and/or 'more than' the chosen values.

**Usage**

Definition JSon

```json
{
  "name": "zoom",
  "more-than": 0.1,
  "less-than": 10.4
}
```

**Error response:** *must_be_more_than: 0.1* or *must_be_less_than: 10.4*

#### lessThanOrEqual and moreThanOrEqual
These validations require the data to be a number (int or float) that is 'less than or equal' and/or 'more than or equal' the chosen values.

**Usage**

Definition JSon

```json
{
  "name": "precision",
  "more-than-or-equal": 3,
  "less-than-or-euqual": 8.6
}
```

**Error response:** *must_be_more_than_or_equal: 3* or *must_be_less_than_or_equal: 8.6*

### Length validation
These two validations are for generic strings to define it's min and max length.

**Usage**

Definition JSon

```json
{
  "name": "pinCode",
  "min-length": 4,
  "max-length": 8
}
```

**Error response:** *must_be_min: 4* or *must_be_max: 8*

### Required validation
This validation checks if the required value is available in the POST JSon.

**Usage**

Definition JSon

```json
{
  "name": "name",
  "required": true
}
```

**Error response:** *field_is_required*

### String validations
These are validations for specific kinds of strings, that must help creating validations tom many field types.

#### alpha
This validation require the data to be only letters and accented letters (A-z and À-ÿ).

**Usage**

Definition JSon

```json
{
  "name": "firstName",
  "type": "text",
  "string": "alpha"
}
```

**Error response:** *not_an_alpha*

#### alphaSpace
This validation require the data to be only letters, accented letters and spaces (A-z, À-ÿ and ' ').

**Usage**

Definition JSon

```json
{
  "name": "fullName",
  "type": "text",
  "string": "alphaSpace"
}
```

**Error response:** *not_an_alpha_space*

#### alphaDash
This validation require the data to be only letters, accented letters and dashes (A-z, À-ÿ, - and \_).

**Usage**

Definition JSon

```json
{
  "name": "serialNumber",
  "type": "text",
  "string": "alphaDash"
}
```
**Error response:** *not_an_alpha_dash*

#### alphaSymbol
This validation require the data to be letters, accented letters and many symbols:

|  A-z  |  À-ÿ  |   \-   |   _   | . | , | ! | @ |
|-------|-------|-------|-------|-------|-------|-------|-------|
| **#** | **$** | **%** | **^** | **{** | **}** | **[** | **]** |
| **&** | **\*** | **(** | **)** | **<** | **>** | **+** | **=** |
| **?** | **:** | **;** | **"&nbsp;"** |

**Usage**

Definition JSon

```json
{
  "name": "address",
  "type": "text",
  "string": "alphaSymbol"
}
```
**Error response:** *not_an_alpha_symbol*

#### alphaNumeric
This validation require the data to be letters, accented letters and numbers (A-z, À-ÿ and 0-9).

**Usage**

Definition JSon

```json
{
  "name": "code",
  "type": "text",
  "string": "alphaNumeric"
}
```
**Error response:** *not_an_alpha_numeric*

#### alphaNumericSpace
This validation require the data to be letters, accented letters, numbers and space (A-z, À-ÿ, 0-9 and ' ').

**Usage**

Definition JSon

```json
{
  "name": "keyCode",
  "type": "text",
  "string": "alphaNumericSpace"
}
```
**Error response:** *not_an_alpha_numeric_space*

#### alphaNumericDash
This validation require the data to be letters, accented letters, numbers and space (A-z, À-ÿ, 0-9, - and \_).

**Usage**

Definition JSon

```json
{
  "name": "serialNumber",
  "type": "text",
  "string": "alphaNumericDash"
}
```

**Error response:** *not_an_alpha_numeric_dash*

#### alphaNumericSymbol
This validation require the data to be letters, accented letters, numbers and many symbols:

|  A-z  |  À-ÿ  |   0-9   |   "&nbsp;"   | . | , | ! | @ |
|-------|-------|-------|-------|-------|-------|-------|-------|
| **#** | **$** | **%** | **^** | **&** | **\*** | **(** | **)** |
| **{** | **}** | **[** | **]** | **<** | **>** | **+** | **=** |
| **?** | **:** | **;** | **-** | **\_** |  |  |  |

**Usage**

Definition JSon

```json
{
  "name": "serialNumber",
  "type": "text",
  "string": "alphaNumericSymbol"
}
```

**Error response:** *not_an_alpha_numeric_symbol*

#### numeric
This validation require the data to be numbers (0-9).

**Usage**

Definition JSon

```json
{
  "name": "products",
  "type": "text",
  "string": "numeric"
}
```

**Error response:** *not_a_numeric*

#### numericFloat
This validation require the data to be numbers, -, . and , (0-9.,-).

**Usage**

Definition JSon

```json
{
  "name": "price",
  "type": "text",
  "string": "numericFloat"
}
```

**Error response:** *not_a_numeric_float*

#### numericDash
This validation require the data to be numbers, -, \_, . and , (0-9.,-\_).

**Usage**

Definition JSon

```json
{
  "name": "balance",
  "type": "text",
  "string": "numericDash"
}
```

**Error response:** *not_a_numeric_dash*

#### numericSymbol
This validation require the data to be numbers and many symbols:

|  0-9  |  "&nbsp;"  |   0-9   |   _   | . | , | ! | @ |
|-------|-------|-------|-------|-------|-------|-------|-------|
| **#** | **$** | **%** | **^** | **&** | **\*** | **(** | **)** |
| **{** | **}** | **[** | **]** | **<** | **>** | **+** | **=** |
| **?** | **:** | **;** | **-** |

**Usage**

Definition JSon

```json
{
  "name": "code",
  "type": "text",
  "string": "numericSymbol"
}
```

**Error response:** *not_a_numeric_symbol*

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

The validation response will be an object with two items: a **boolean** and an **object**.

The **boolean** is called **"error"** and will be true if **any of the validations did not pass**.

The **object** is called **"result"** and will have all the **validated fields** as an object. If any validation failed, this object will have the validation type and the result, for instance:

```javascript
{
  error: true,
  response: {
    name: {},
    password: {
      required: 'field_is_required',
      'max-length': 'must_be_more_than_chars: 4'
    },
    description: {},
    quantity: {},
    position: {},
    color: {},
    themeColor: {
      type: 'not_a_color'
    },
    birthDay: {},
    arrival: {},
    email: {},
    siteaddress: {
      type: 'not_an_url'
    },
    phone: {
      type: 'not_a_tel'
    },
    cell: {}
  }
}
```

## License

The MIT License (MIT)

Copyright (c) 2016 Moblets

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
