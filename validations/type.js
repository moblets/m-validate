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
        var email = new RegExp(/^([a-zA-Z0-9\.\-_])+/.source +
          /@(([a-zA-Z0-9\-])+\.)+/.source +
          /([a-zA-Z0-9]{2,4})+$/.source);
        if (!email.test(theData)) {
          response = 'not_an_email';
        }
        break;
      default:
        response = true;
        break;
    }
  }
  return response;
};
