const $form = document.querySelector(".modal__form");

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

  setTimeout(closeModal($contactModal), 1000);
}

$form.addEventListener("submit", (e) => {
  e.preventDefault();
  logModal();
});
