module.exports = function(required, theData) {
  var regex = /^[a-zA-Z]+$/;
  var response = "not_an_alpha";
  if (theData !== undefined && regex.test(theData)) {
    response = true;
  }
  return response;
};
