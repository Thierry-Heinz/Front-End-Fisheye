/**
 *
 * Modal
 *
 */

export default class Modal {
  constructor() {
    this.$modalWrapper = document.createElement("div");
    this.$main = document.querySelector("#main");
  }

  /**
   *
   * Modal creation
   *
   */
  createCloseButton() {
    const $button = document.createElement("button");
    $button.ariaLabel = "Fermer la fenêtre";
    $button.classList.add("close_button");
    const $icon = `<svg role="img" class="close_button-icon" aria-labelledby="close_button-title">
            <title id="close_button-title">Fermer la fenêtre</title>
            <use xlink:href="#close_button" ></use>
          </svg>`;
    $button.innerHTML = $icon;
    return $button;
  }
  createModalTitle(title) {
    const $h2 = document.createElement("h2");
    $h2.classList.add("modal-title");
    $h2.textContent = title;
    return $h2;
  }
  createModalHeader() {
    const $header = document.createElement("header");
    $header.classList.add("modal__header");
    return $header;
  }
  createModalBody() {
    const $div = document.createElement("div");
    $div.classList.add("modal__body");
    return $div;
  }
  createModal(id, title, $bodyContent) {
    this.$modalWrapper.classList.add("modal-container");
    this.$modalWrapper.id = id;
    this.$modalWrapper.setAttribute("tabindex", "-1");
    this.$modalWrapper.ariaHidden = true;
    this.$modalWrapper.setAttribute("aria-labelledby", "modal-title");

    const $header = this.createModalHeader();
    const $body = this.createModalBody();
    const $title = this.createModalTitle(title);
    const $closeButton = this.createCloseButton();

    $header.append($title, $closeButton);
    $body.appendChild($bodyContent);

    this.$modalWrapper.append($header, $body);
    this.handleCloseButton();
    this.handleEscKey();
    this.$main.after(this.$modalWrapper);
  }

  /**
   * Modal functionalities
   */
  openModal() {
    this.$main.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "hidden";
    this.$modalWrapper.style.display = "block";
    this.$modalWrapper.setAttribute("aria-hidden", "false");

    const $closeButton = this.$modalWrapper.querySelector(".close_button");
    $closeButton.focus();
  }
  closeModal() {
    this.$main.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "visible";
    this.$modalWrapper.style.display = "none";
    this.$modalWrapper.setAttribute("aria-hidden", "true");
  }
  handleCloseButton() {
    const that = this;
    that.$modalWrapper
      .querySelector(".close_button")
      .addEventListener("click", function () {
        that.closeModal();
      });
  }
  handleEscKey() {
    const that = this;
    document.body.addEventListener("keydown", (e) =>
      e.key == "Escape" ? that.closeModal() : ""
    );
    document.querySelector("header a").focus();
  }
}
