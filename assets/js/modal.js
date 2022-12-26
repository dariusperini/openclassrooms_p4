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
const succesContent = document.querySelector(".success-content");

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));
// close modal event
modalbg.querySelector('.close').addEventListener("click", closeModal);
modalbg.querySelector('.btn-close').addEventListener("click", closeModal);

// launch modal form
function launchModal() 
{
  modalbg.style.display = "block";
}

// close modal form
function closeModal() 
{
  modalbg.style.display = "none";
}

function displaySuccess()
{
  succesContent.style.display = "flex";

}
