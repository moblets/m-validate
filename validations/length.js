module.exports = {
  min: function(theLength, theData) {
    var response = true;
    if (theData !== undefined && theLength > theData.length) {
      response = 'must_be_at_least_chars: ' + theLength;
    }
    return response;
  },
  max: function(theLength, theData) {
    var response = true;
    if (theData !== undefined && theLength < theData.length) {
      response = 'must_be_more_than_chars: ' + theLength;
    }
    return response;
  }
};
