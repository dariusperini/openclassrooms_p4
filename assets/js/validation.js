const form = document.getElementById('form');
const firstnameName = document.getElementById('firstnameName');
const lastnameName = document.getElementById('lastnameName');
const email = document.getElementById('email');
const birthdate = document.getElementById('birthdate');
const turnaments = document.getElementById('turnaments');
const conditions = document.getElementById('conditions-checkbox');

const errorMessages = {
    "firstname" : "Le champ Prénom doit avoir un minimum de 2 caractères et ne doit pas être vide.",
    "lastname" : "Le champ Nom doit avoir un minimum de 2 caractères et ne doit pas être vide.",
    "email" : "L'adresse électronique est invalide.",
    "birthdate": "La date de naissance saisie est invalide.",
    "quantity": "Le nombre de concours doit être numérique.",
    "conditions": "Vous devez accepeter les conditions d'utilisation.",
    "location": "Vous devez indiquer à quel tournoi vous avez participé cette année."
  };

  function checkForm(form) {
    var validate = true;
  
    for (var field=0; field < form.elements.length; field++) {
      if(!checkField(form.elements[field])) {
        validate = false;
      }
    }
  
    return validate;
  }
  
  function checkField(field)
  {
    if(!areRulesValidated(field.name, field.value)) {
      eval("alert(errorMessages." + field.id + ");");
      return false;
    }
  
    return true;
  }
  
  // Rules checking function
  function areRulesValidated(fieldName, fieldValue)
  {
    var returnValue = false;
  
    switch(fieldName) {
      case "firstname":
      case "lastname":
        if (fieldValue.length>2 && fieldValue != null) {
          returnValue = true;
        }
        else {
            //showError(fieldName,'pas cool');
        }
      break;
  
      case "email":
        return String(fieldValue)
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
      break;
  
      case "birthdate":
        if (fieldValue != null) {
          returnValue = true;
        }
      break;
      
      case "quantity":
        if (fieldValue != null && !isNaN(fieldValue)) {
          returnValue = true;
        }
      break;
  
      case "conditions":
      case "location":
        if (fieldValue != null) {
          returnValue = true;
        }
      break;
  
      case "subscribe":
          returnValue = true;
          break;
  
      default:
    }
  
    return returnValue;
  }

function showError(fieldId, message) {
    mydiv = document.getElementById('error-' . fieldId);
    mydiv.style.display = "block"
}

function hideError(id, message) {
    mydiv = document.getElementById('error-' . id);
    mydiv.style.display = "none"
}
