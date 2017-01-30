module.exports = function(required, theData) {
  var response = true;
  if (typeof theData === 'undefined' || theData === '' || theData === null) {
    response = 'field_is_required';
  }
  return response;
};
