module.exports = function(required, theData) {
  var alpha = /^[a-zA-Z0-9 .,?!-]+$/;
  var response = true;
  if (theData !== undefined && !alpha.test(theData)) {
    response = 'not_an_alpha';
  }
  return response;
};
