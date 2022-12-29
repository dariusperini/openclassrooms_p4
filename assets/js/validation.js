/**
 * @todo
 *    Radio
 *    Date de naissance
 *    Message de confirmation quand OK
 */

const form = document.querySelector('form');
const today = new Date();

const errorMessages = {
  "firstname": "Le champ Prénom doit avoir un minimum de 2 caractères et ne doit pas être vide.",
  "lastname": "Le champ Nom doit avoir un minimum de 2 caractères et ne doit pas être vide.",
  "email": "L'adresse électronique est invalide.",
  "birthdate": "La date de naissance ne peut être vide et doit être dans le passé !",
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

  // For each element of the form, we check if the rules are validated
  for (let field = 0; field < form.elements.length; field++) {
    if (!isRulesValidated(form.elements[field])) {
      validate = false;
    }
  }

  //  Every fields are ok, we send the form and show the success message
  if(validate) {
    hideForm();
    displaySuccess();
    let formData = new FormData(form);
    console.log(Object.fromEntries(formData))
  }
}


// Rules checking function
function isRulesValidated(field) {
  let fieldName = field.name;
  let fieldValue = field.value;
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
      var date = new Date(fieldValue);
      if (!!fieldValue && date < today) {
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

// Show the erreor for a specified field
function showError(fieldName) {
  let errorDiv = document.getElementById('error-' + fieldName);
  errorDiv.style.display = "block";
  errorDiv.textContent = errorMessages[fieldName];
  let mydiv = document.getElementById(fieldName);
  if(mydiv) {
    mydiv.style.borderColor = "red"; 
  }
}

// Hide the erreor for a specified field
function hideError(fieldName) {
  let errorDiv = document.getElementById('error-' + fieldName);
  errorDiv.style.display = "none";
  let mydiv = document.getElementById(fieldName);
  if(mydiv) {
    mydiv.style.borderColor = "black"; 
  }
}

function hideForm()
{
  form.style.display = "none";
}

// Event listeners
window.addEventListener('load', () => {
  form.querySelectorAll('input').forEach(element => element.addEventListener('blur', ({ target }) => isRulesValidated(target)));
  form.querySelectorAll('input').forEach(element => element.addEventListener('keydown', ({ target }) => isRulesValidated(target)));
  form.querySelectorAll('input[name=location]').forEach(element => element.addEventListener('click', ({ target }) => isRulesValidated(target)));
  form.querySelectorAll('input[name=conditions]').forEach(element => element.addEventListener('click', ({ target }) => isRulesValidated(target)));
  form.addEventListener('submit', event => {
    event.preventDefault();
    checkForm(event.target);
  });
});