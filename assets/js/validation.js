/**
 * @todo
 *    Radio
 *    Date de naissance
 *    Message de confirmation quand OK
 */

const form = document.querySelector('form');

const errorMessages = {
  "firstname": "Le champ Prénom doit avoir un minimum de 2 caractères et ne doit pas être vide.",
  "lastname": "Le champ Nom doit avoir un minimum de 2 caractères et ne doit pas être vide.",
  "email": "L'adresse électronique est invalide.",
  "birthdate": "La date de naissance saisie est invalide.",
  "quantity": "Le nombre de concours doit être numérique.",
  "conditions": "Vous devez accepeter les conditions d'utilisation.",
  "location": "Vous devez indiquer à quel tournoi vous avez participé cette année."
};

// Pour aller plus loin
// const validationFields = {
//   firstname: {
//     validate(value) {
//       return fieldValue.length > 2 && !!fieldValue;
//     },
//     errorMessage: "Le champ Prénom doit avoir un minimum de 2 caractères et ne doit pas être vide."
//   }
// }

function checkForm(form) {
  let validate = true;

  for (let field = 0; field < form.elements.length; field++) {
    if (!checkField(form.elements[field])) {
      validate = false;
    }
  }

  return validate;
}

function checkField(field) {
  return areRulesValidated(field.name, field.value);
}

// Rules checking function
function areRulesValidated(fieldName, fieldValue) {
  let returnValue = false;

  switch (fieldName) {
    case "firstname":
    case "lastname":
      if (fieldValue.length > 2 && !!fieldValue) { // null => false, undefined => false, '' => false
        returnValue = true;
      }
      break;

    case "email":
      if (String(fieldValue)
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )) {
        returnValue = true;
      }
      break;

    case "birthdate":
      if (fieldValue != null) {
        returnValue = true;
      }
      break;

    case "quantity":
      if (fieldValue.trim() != "" && !isNaN(fieldValue)) {
        returnValue = true;
      }
      break;


    case "conditions":
      if (document.getElementById(fieldName).checked) {
        returnValue = true;
      }
      break;

    case "location":
      /**
       * @TODO trouver dans la liste le premier qui est checked
       */
      const locationRadioElements = document.getElementsByName(fieldName);
      returnValue = false;
      // if () {
      //   returnValue = true;
      // }
      break;

    default:
      returnValue = true;
  }

  console.log(fieldName + ': ' + returnValue);

  if (!returnValue) {
    showError(fieldName);
  }
  else {
    hideError(fieldName);
  }

  return returnValue;
}

function showError(fieldName) {
  mydiv = document.getElementById('error-' + fieldName);
  mydiv.style.display = "block";
  mydiv.textContent = errorMessages[fieldName];
}

function hideError(fieldName) {
  mydiv = document.getElementById('error-' + fieldName);
  mydiv.style.display = "none";
}

window.addEventListener('load', () => {
  form.querySelectorAll('input').forEach(element => element.addEventListener('blur', ({ target }) => checkField(target)));
  form.addEventListener('submit', event => {
    event.preventDefault();
    checkForm(event.target);
  });
});