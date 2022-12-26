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

  if(validate) {
    hideForm();
    displaySuccess();
    form.submit();
  }
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
      if (fieldValue.length >= 2 && !!fieldValue) { // null => false, undefined => false, '' => false
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
      const locationRadioElements = document.getElementsByName(fieldName);
      returnValue = false;
      var i=0;
      while (i < locationRadioElements.length && !returnValue ) {
        if (locationRadioElements[i].checked) {
          returnValue = true;
        }
        i++;
      }
    
      break;

    default:
      returnValue = true;
  }

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
  mydiv.style.borderColor = "red"; 
}

function hideError(fieldName) {
  mydiv = document.getElementById('error-' + fieldName);
  mydiv.style.display = "none";
  mydiv.style.borderColor = "black"; 
}


function hideForm()
{
  form.style.display = "none";
}

function sendForm()
{
  form.submit();
}

window.addEventListener('load', () => {
  form.querySelectorAll('input').forEach(element => element.addEventListener('blur', ({ target }) => checkField(target)));
  form.querySelectorAll('input').forEach(element => element.addEventListener('keydown', ({ target }) => checkField(target)));
  form.querySelectorAll('input[name=location]').forEach(element => element.addEventListener('click', ({ target }) => checkField(target)));
  form.querySelectorAll('input[name=conditions]').forEach(element => element.addEventListener('click', ({ target }) => checkField(target)));
  form.addEventListener('submit', event => {
    event.preventDefault();
    checkForm(event.target);
  });
});