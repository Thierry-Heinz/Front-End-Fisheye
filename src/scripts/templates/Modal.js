/**
 *
 * Modal
 *
 */

export default class Modal {
  constructor() {
    this.$modalWrapper = document.createElement("div");
    this.$main = document.querySelector("#main");
    this.$closeButton = document.createElement("button");
  }

  /**
   *
   * Modal creation
   *
   */
  createCloseButton(id) {
    this.$closeButton.classList.add("close_button");
    this.$closeButton.setAttribute("aria-label", "Fermer la fenêtre");
    this.$closeButton.setAttribute("tabindex", "1");
    const $icon = `<svg role="img" class="close_button-icon" aria-labelledby="${id}-close_button-title">
            <title id="${id}-close_button-title">Fermer la fenêtre</title>
            <use xlink:href="#close_button" ></use>
          </svg>`;
    this.$closeButton.innerHTML = $icon;
    return this.$closeButton;
  }
  createModalTitle(id, title) {
    const $h2 = document.createElement("h2");
    $h2.classList.add("modal-title");
    $h2.id = id + "__title";
    $h2.textContent = title;
    return $h2;
  }
  createModalHeader() {
    const $header = document.createElement("header");
    $header.classList.add("modal__header");
    $header.setAttribute("tabindex", "-1");
    return $header;
  }
  createModalBody() {
    const $div = document.createElement("div");
    $div.classList.add("modal__body");
    $div.setAttribute("tabindex", "-1");
    return $div;
  }

  //Create the modal and populate it. Used by the lightbox object and the contactModal object.
  createModal(id, title, $bodyContent) {
    this.$modalWrapper.classList.add("modal__wrapper");
    this.$modalWrapper.id = id;
    this.$modalWrapper.setAttribute("tabindex", "-1");
    this.$modalWrapper.ariaHidden = true;
    this.$modalWrapper.setAttribute("aria-labelledby", id + "__title");

    const $modalContent = document.createElement("div");

    $modalContent.classList.add("modal__wrapper__content");
    $modalContent.setAttribute("tabindex", "-1");
    $modalContent.setAttribute("role", "dialog");
    $modalContent.setAttribute("aria-labelledBy", id + "__title");

    const $header = this.createModalHeader();
    const $body = this.createModalBody();
    const $title = this.createModalTitle(id, title);
    const $closeButton = this.createCloseButton(id);

    $header.append($title, $closeButton);
    $body.appendChild($bodyContent);

    $modalContent.append($header, $body);
    this.$modalWrapper.appendChild($modalContent);
    this.handleCloseButton();
    this.handleEscKey();
    this.$main.after(this.$modalWrapper);
  }

  /**
   * Modal functionalities
   */

  // General method for opening the modal instance.
  openModal() {
    this.$main.setAttribute("aria-hidden", "true");
    this.$modalWrapper.style.display = "flex";
    this.$modalWrapper.setAttribute("aria-hidden", "false");
    this.modalWrapper = this.$modalWrapper;
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  }
  //General method for closing the modal instance
  closeModal() {
    this.$main.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "visible";
    this.$modalWrapper.style.display = "none";
    this.$modalWrapper.setAttribute("aria-hidden", "true");
    document.querySelector("header a").focus();
  }
  // click listener for the close button of the modal instance
  handleCloseButton() {
    const that = this;
    that.$modalWrapper
      .querySelector(".close_button")
      .addEventListener("click", function () {
        that.closeModal();
      });
  }
  // keyboard listener for closing the modal instance
  handleEscKey() {
    const that = this;
    document.body.addEventListener("keydown", (e) =>
      e.key == "Escape" ? that.closeModal() : ""
    );
  }
}
