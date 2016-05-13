var moment = require('moment');
module.exports = function(theType, theData, theValues) {
  var response = true;
  if (theData !== undefined) {
    switch (theType) {
      case "number":
        var number = /^\d+$/;
        if (!number.test(theData)) {
          response = 'not_a_number';
        }
        break;
      case "select":
        if (typeof theValues[theData] === 'undefined') {
          response = 'not_in_the_select_list';
        }
        break;
      case "color":
        var color = /^#([A-Fa-f0-9]{6})$/;
        if (!color.test(theData)) {
          response = 'not_a_color';
        }
        break;
      case "date":
        var m = moment(theData, 'YYYY-MM-DD', true);
        if (m.isValid() === false) {
          response = 'not_a_date';
        }
        break;
      case "time":
        var t = moment(theData, 'H:mm', true);
        if (t.isValid() === false) {
          response = 'not_a_time';
        }
        break;
      case "email":
        var email = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

        if (!email.test(theData)) {
          response = 'not_an_email';
        }
        break;
      case "url":
        var url = /^(https?:\/\/)?((([a-z\d]([a-z\d-]*[a-z\d])*)\.?)+[a-z]{2,}|((\d{1,3}\.){3}\d{1,3}))(:\d+)?(\/[-a-z\d%_.~+]*)*(\?[;&a-z\d%_.~+=-]*)?(#[-a-z\d_]*)?$/i;

        if (!url.test(theData)) {
          response = 'not_an_url';
        }
        break;
      default:
        response = true;
        break;
    }
  }
  return response;
};
