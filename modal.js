function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");

const errorMessages = {
  "first" : "Le champ Prénom doit avoir un minimum de 2 caractères et ne doit pas être vide.",
  "last" : "Le champ Nom doit avoir un minimum de 2 caractères et ne doit pas être vide.",
  "email" : "L'adresse électronique est invalide.",
  "birthdate": "La date de naissance saisie est invalide.",
  "quantity": "Le nombre de concours doit être numérique.",
  "conditions": "Vous devez accepeter les conditions d'utilisation.",
  "location": "Vous devez indiquer à quel tournoi vous avez participé cette année."
};

var finalErrorMessage = "";

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

// close modal form
function closeModal() {
  modalbg.style.display = "none";
}

function checkForm(form) {
  validate = true;

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
  returnValue = false;
  switch(fieldName) {
    case "first":
    case "last":
      if (fieldValue.length>2 && fieldValue != null) {
        returnValue = true;
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



