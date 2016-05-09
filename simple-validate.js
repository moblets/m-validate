/**
 * [function description]
 * @param  {Object} data  The data to be validated. Each field in the data
 * object must match a "field" in the rules JSon.
 * @param  {JSon} rules The JSon with each data and the validations
 * @return {Object}       Object with the found errors. If no error was found,
 * an empty object will be returned
 */

module.exports = function(data, rules) {
  console.log(data);
  console.log(rules);
};
