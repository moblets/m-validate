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
        var date = /[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/;
        if (!date.test(theData)) {
          response = 'not_a_date';
        }
        break;
      default:
        response = true;
        break;
    }
  }
  return response;
};
