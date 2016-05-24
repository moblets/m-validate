module.exports = {
  lessThan: function(theLessThanValue, theData) {
    var response = true;
    if (theData !== undefined && Number(theData) >= theLessThanValue) {
      response = 'must_be_less_than: ' + theLessThanValue;
    }
    return response;
  },
  lessThanOrEqual: function(theLessThanOrEqualValue, theData) {
    var response = true;
    if (theData !== undefined && Number(theData) > theLessThanOrEqualValue) {
      response = 'must_be_less_than_or_equal: ' + theLessThanOrEqualValue;
    }
    return response;
  },
  moreThan: function(theMoreThanValue, theData) {
    var response = true;
    if (theData !== undefined && Number(theData) <= theMoreThanValue) {
      response = 'must_be_more_than: ' + theMoreThanValue;
    }
    return response;
  },
  moreThanOrEqual: function(theMoreThanOrEqualValue, theData) {
    var response = true;
    if (theData !== undefined && Number(theData) < theMoreThanOrEqualValue) {
      response = 'must_be_more_than_or_equal: ' + theMoreThanOrEqualValue;
    }
    return response;
  }
};
