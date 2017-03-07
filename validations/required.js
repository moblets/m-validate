module.exports = function(required, theData) {
  var response = true;
  if (typeof theData === 'undefined' || theData === '' || theData === null ||
      (theData.length !== undefined && theData.length === 0)) {
    response = 'field_is_required';
  }
  return response;
};
