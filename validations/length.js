module.exports = {
  min: function(theLength, theData) {
    var response = true;
    if (theData !== undefined && theLength > theData.length) {
      response = 'must_be_min: ' + theLength;
    }
    return response;
  },
  max: function(theLength, theData) {
    var response = true;
    if (theData !== undefined && theLength < theData.length) {
      response = 'must_be_max: ' + theLength;
    }
    return response;
  }
};
