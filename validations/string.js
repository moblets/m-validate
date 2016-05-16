module.exports = function(theType, theData) {
  var response = true;
  if (theData !== undefined) {
    switch (theType) {
      case "alpha":
        var alpha = /^[A-zÀ-ÿ]*$/;
        if (!alpha.test(theData)) {
          response = 'not_an_alpha';
        }
        break;
      case "alphaSpace":
        var alphaSpace = /^[A-zÀ-ÿ ]*$/;
        if (!alphaSpace.test(theData)) {
          response = 'not_an_alpha_space';
        }
        break;
      case "alphaDash":
        var alphaDash = /^[A-zÀ-ÿ_\-]*$/;
        if (!alphaDash.test(theData)) {
          response = 'not_an_alpha_dash';
        }
        break;
      case "alphaSymbol":
        var alphaSymbol = /^[A-zÀ-ÿ_\-.,!@#$%^&*(){}[\]<>+=?:; ]*$/;
        if (!alphaSymbol.test(theData)) {
          response = 'not_an_alpha_symbol';
        }
        break;
      case "alphaNumeric":
        var alphaNumeric = /^[A-zÀ-ÿ0-9]*$/;
        if (!alphaNumeric.test(theData)) {
          response = 'not_an_alpha_numeric';
        }
        break;
      case "alphaNumericSpace":
        var alphaNumericSpace = /^[A-zÀ-ÿ0-9 ]*$/;
        if (!alphaNumericSpace.test(theData)) {
          response = 'not_an_alpha_numeric_space';
        }
        break;

      case "alphaNumericDash":
        var alphaNumericDash = /^[A-zÀ-ÿ0-9_-]*$/;
        if (!alphaNumericDash.test(theData)) {
          response = 'not_an_alpha_numeric_dash';
        }
        break;

      case "alphaNumericSymbol":
        var alphaNumericSymbol = /^[A-zÀ-ÿ0-9_\-.,!@#$%^&*(){}[\]<>+=?:; ]*$/;
        if (!alphaNumericSymbol.test(theData)) {
          response = 'not_an_alpha_numeric_symbol';
        }
        break;

      case "numeric":
        var numeric = /^[0-9]*$/;
        if (!numeric.test(theData)) {
          response = 'not_a_numeric';
        }
        break;

      case "numericFloat":
        var numericSpace = /^[0-9.,]*$/;
        if (!numericSpace.test(theData)) {
          response = 'not_a_numeric_float';
        }
        break;

      case "numericDash":
        var numericDash = /^[0-9_\-.,]*$/;
        if (!numericDash.test(theData)) {
          response = 'not_a_numeric_dash';
        }
        break;

      case "numericSymbol":
        var numericSymbol = /^[0-9_\-.,!@#$%^&*(){}[\]<>+=?:; ]*$/;
        if (!numericSymbol.test(theData)) {
          response = 'not_a_numeric_symbol';
        }
        break;
      default:
        response = true;
        break;
    }
  }
  return response;
};
