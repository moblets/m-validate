module.exports = function(required, theData) {
  var response = true;
  if (theData === undefined) {
    response = 'field_is_required';
  }
  return response;
};
