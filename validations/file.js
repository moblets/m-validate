module.exports = function(required, theData) {
  var regex = /[A-z0-9.-]+\.[A-z]{2,4}/i;
  var response = "not_an_file_extension";
  if (theData && regex.test(theData)) {
    response = true;
  }
  return response;
};
