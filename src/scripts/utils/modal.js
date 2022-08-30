/****
 *
 * Modal
 *
 */

/***
 * DOM Element reference
 */
const $main = document.querySelector("#main");

const $contactModal = document.getElementById("contact_modal");
const $contactOpenButton = document.querySelector(".contact_button");
const $modals = document.querySelectorAll(".modal-container");

const $lightboxModal = document.getElementById("lightbox_modal");
const $closeButtons = document.querySelectorAll(".close_button");

/***
 * Modal utility functions
 */

// Find the modal currently open based on aria-hidden attribute
const findModal = () => {
  return Array.from($modals).find((modal) => {
    const ariaHidden = modal.getAttribute("aria-hidden");
    return ariaHidden == "false" ? modal : "";
  });
};

// Open the targeted modal
function displayModal($modal) {
  $main.setAttribute("aria-hidden", "true");
  $modal.style.display = "block";
  $modal.setAttribute("aria-hidden", "false");

  $closeButton = $modal.querySelector(".close_button");
  console.log($closeButton);
  $closeButton.focus();
}

// Close the targeted modal
function closeModal($modal) {
  $main.setAttribute("aria-hidden", "false");
  $modal.style.display = "none";
  $modal.setAttribute("aria-hidden", "true");
}

/***
 * Event listener triggering the modal
 */

// Listening to the click event of the open contact button
$contactOpenButton.addEventListener("click", (e) => {
  e.preventDefault();
  displayModal($contactModal);
});

//Close any modal opened by clicking the close X button
$closeButtons.forEach((closeButton) => {
  closeButton.addEventListener("click", (e) => {
    e.preventDefault();
    closeModal(findModal());
  });
});

//Close any modal opened by pressing the Esc keayboard touch
document.body.addEventListener("keydown", (e) => {
  if (e.key == "Escape") {
    closeModal(findModal());
  }
});

//Add a little delay for the lightbox to be populated before allowing to open the lightbox modal
setTimeout(() => {
  var $lightboxLinks = document.querySelectorAll(".open-lightbox");
  $lightboxLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const mediaIndex = this.dataset.index;
      setActiveSlide(mediaIndex);
      displayModal($lightboxModal);
    });
  });
}, 500);
