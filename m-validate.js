/**
 * [function description]
 * @param  {Object} data  The data to be validated. Each field in the data
 * object must match a "field" in the rules JSon.
 * @param  {Object} rules The object with each field and the validations
 * @return {Object}       Object with the found errors. If no error was found,
 * an empty object will be returned
 */
var validations = {
  /**
   * Validate if the content matches the defined type
   * @param  {string} theType The type of the field
   * @param  {string} theData The filled form data
   * @param  {object} theValues The values of a list, from types select,
   * checkbox or radio
   * @return {mixed}         String with the error or false
   */
  type: function(theType, theData, theValues) {
    // console.log('TYPE ----------------------------------------');
    // console.log(theType);
    // console.log(theData);
    // console.log(theValues);
    // console.log('-------------------------------------------------');
    //
    // console.log('type', theType, theData, theValues);
    var response = true;
    if (theData !== undefined) {
      switch (theType) {
        case "number":
          var regex = /([0-9])/;
          if (!regex.test(theData)) {
            response = 'not_a_number';
          }
          break;
        case "select":
          if (typeof theValues[theData] === 'undefined') {
            response = 'not_in_the_select_list';
          }
          break;
        default:
          response = true;
          break;
      }
    }
    return response;
  },
  minLength: function(theLength, theData) {
    // console.log('minLength', theLength, theData);
    var response = true;
    if (theData !== undefined && theLength > theData.length) {
      response = 'must_be_at_least_chars: ' + theLength;
    }
    return response;
  },
  maxLength: function(theLength, theData) {
    console.log('-----------------------', theData.length);
    var response = true;
    if (theData !== undefined && theLength < theData.length) {
      response = 'must_be_more_than_chars: ' + theLength;
    }
    return response;
  },
  required: function(required, theData) {
    var response = true;
    if (theData === undefined) {
      response = 'field_is_required';
    }
    return response;
  }
};

var validate = function(content, properties) {
  // console.log('---------------CONTENT-------------');
  // console.log(content);
  // console.log('----------------RULES--------------');
  // console.log(properties);
  // console.log('-----------------------------------');

  // Set the response code as 200 as default. Change on error.
  var response = {
    code: 200
  };

  // Iterate the array with the PROPERTIES
  for (var i = 0; i < properties.length; i++) {
    var property = properties[i];
    console.log('property = ', property);
    // Iterate the RULES of a PROPERTY
    for (var rule in property) {
      if (property.hasOwnProperty(rule)) {
        var fieldName = property.name;

        // Create the object for the results of a property
        if (typeof response[fieldName] === 'undefined') {
          response[fieldName] = {};
        }

        // Convert the rule to camelCase to respect Google Style
        var ccRule = rule.replace(/-([a-z])/g, function(g) {
          return g[1].toUpperCase();
        });
        // console.log('-----', rule, ccRule);
        // Validate all rules existing in the validation functions
        // Ignore "name" and keys that don't have a validation deffined
        if (
          rule !== 'name' &&
          typeof validations[ccRule] !== 'undefined') {
          var validationResult = validations[ccRule](
            property[rule],
            content[fieldName],
            property.values
          );
          if (validationResult !== true) {
            response.code = 400;
            (response[fieldName])[rule] = validationResult;
          }
        }
      }
    }
  }
  return response;
};

module.exports = validate;
// function

// Laravel Validation Strings to be remembered
/**
    /*
    |--------------------------------------------------------------------------
    | Validation Language Lines
    |--------------------------------------------------------------------------
    |
    | The following language lines contain the default error messages used by
    | the validator class. Some of these rules have multiple versions such
    | such as the size rules. Feel free to tweak each of these messages.
    |

    "accepted"                  => ":attribute deve ser aceito.",
    "active_url"                => ":attribute não contém um URL válido.",
    "after"                     => ":attribute deverá conter uma data posterior a :date.",
    "alpha"                     => ":attribute deverá conter apenas letras.",
    "alpha_dash"                => ":attribute deverá conter apenas letras, números e traços.",
    "alpha_num"                 => ":attribute deverá conter apenas letras e números .",
    "array"                     => ":attribute precisa ser um conjunto.",
    "before"                    => ":attribute deverá conter uma data anterior a :date.",
    "between"                   => [
        "numeric" => ":attribute deverá ter um valor entre :min e :max.",
        "file"    => ":attribute deverá ter um tamanho entre :min e :max kilobytes.",
        "string"  => ":attribute deverá conter entre :min e :max caracteres.",
        "array"   => ":attribute precisar ter entre :min e :max itens.",
    ],
    "boolean"                   => ":attribute deverá ter o valor verdadeiro ou falso.",
    "confirmed"                 => "A confirmação para :attribute não coincide.",
    "date"                      => ":attribute não contém uma data válida.",
    "date_format"               => "A data indicada em :attribute não respeita o formato :format.",
    "different"                 => ":attribute e :other deverão conter valores diferentes.",
    "digits"                    => ":attribute deverá conter :digits dígitos.",
    "digits_between"            => ":attribute deverá conter entre :min a :max dígitos.",
    "email"                     => ":attribute não contém um endereço de email válido.",
    "exists"                    => "O valor selecionado para :attribute é inválido.",
    "filled"                    => "É obrigatória a indicação de um valor para :attribute.",
    "image"                     => ":attribute deverá conter uma imagem.",
    "in"                        => ":attribute não contém um valor válido.",
    "integer"                   => ":attribute deverá conter um número inteiro.",
    "ip"                        => ":attribute deverá conter um IP válido.",
    "max"                       => [
        "numeric" => ":attribute não deverá conter um valor superior a :max.",
        "file"    => ":attribute não deverá ter um tamanho superior a :max kilobytes.",
        "string"  => ":attribute não deverá conter mais de :max caracteres.",
        "array"   => ":attribute deve ter no máximo :max itens.",
    ],
    "mimes"                     => ":attribute deverá conter um arquivo do tipo: :values.",
    "min"                       => [
        "numeric" => ":attribute deverá ter um valor superior ou igual a :min.",
        "file"    => ":attribute deverá ter no mínimo :min kilobytes.",
        "string"  => ":attribute deverá conter no mínimo :min caracteres.",
        "array"   => ":attribute deve ter no mínimo :min itens.",
    ],
    "not_in"                    => ":attribute contém um valor inválido.",
    "numeric"                   => ":attribute deverá conter um valor numérico.",
    "regex"                     => "O formato do valor para :attribute é inválido.",
    "required"                  => "É obrigatória a indicação de um valor para :attribute.",
    "required_if"               => "É obrigatória a indicação de um valor para :attribute quando :other é igual a :value.",
    "required_with"             => "É obrigatória a indicação de um valor para :attribute quando :values está presente.",
    "required_with_all"         => "É obrigatória a indicação de um valor para :attribute quando um dos :values está presente.",
    "required_without"          => "É obrigatória a indicação de um valor para :attribute quanto :values não está presente.",
    "required_without_all"      => "É obrigatória a indicação de um valor para :attribute quando nenhum dos :values está presente.",
    "same"                      => "Os campos :attribute e :other deverão conter valores iguais.",
    "size"                      => [
        "numeric" => ":attribute deverá conter o valor :size.",
        "file"    => ":attribute deverá ter o tamanho de :size kilobytes.",
        "string"  => ":attribute deverá conter :size caracteres.",
        "array"   => ":attribute deve ter :size itens.",
    ],
    "string"                    => ":attribute deve ser uma string.",
    "timezone"                  => ":attribute deverá ter um fuso horário válido.",
    "unique"                    => "O valor indicado para :attribute já está sendo utilizado.",
    "url"                       => "O formato da URL indicado em :attribute é inválido.",
 */
