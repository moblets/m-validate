module.exports = function(theType, theData, theValues) {
  var response = true;
  if (theData !== undefined) {
    switch (theType) {
      case "number":
        var regex = /^\d+$/;
        if (!regex.test(theData)) {
          response = 'not_a_number';
        }
        break;
      case "select":
        if (typeof theValues[theData] === 'undefined') {
          response = 'not_in_the_select_list';
        }
        break;
      default:
        response = true;
        break;
    }
  }
  return response;
};
