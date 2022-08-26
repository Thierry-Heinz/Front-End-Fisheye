const $main = document.querySelector("#main");
const $form = document.querySelector(".modal__form");
const $modal = document.getElementById("contact_modal");

const $openButton = document.querySelector(".contact_button");
const $closeButton = document.querySelector(".close_button");

function displayModal() {
  $main.setAttribute("aria-hidden", "true");
  $modal.style.display = "block";
  $modal.setAttribute("aria-hidden", "false");
  $closeButton.focus();
}

function closeModal() {
  $main.setAttribute("aria-hidden", "false");
  $modal.style.display = "none";
  $modal.setAttribute("aria-hidden", "true");
  $openButton.focus();
}

function logModal() {
  const $firstname = document.querySelector("input#firstname");
  const $lastname = document.querySelector("input#lastname");
  const $email = document.querySelector("input#email");
  const $message = document.querySelector("textarea#message");

  console.log(`
    Prénom: ${$firstname.value}
    Nom: ${$lastname.value}
    Email: ${$email.value}
    Message: ${$message.value}
    `);

  setTimeout(closeModal(), 1000);
}

$openButton.addEventListener("click", (e) => {
  e.preventDefault();
  displayModal();
});

$closeButton.addEventListener("click", (e) => {
  e.preventDefault();
  closeModal();
});

document.body.addEventListener("keydown", (e) => {
  const ariaModal = $modal.getAttribute("aria-hidden");
  if (ariaModal == "false" && e.key == "Escape") {
    closeModal();
  }
});

$form.addEventListener("submit", (e) => {
  e.preventDefault();
  logModal();
});
