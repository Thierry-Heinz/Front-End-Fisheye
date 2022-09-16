/**
 *
 * Contact modal
 *
 */

import Modal from "../templates/Modal";

export default class ContactModal extends Modal {
  constructor() {
    super();
    this._id = "contact_modal";
    this.$contactWrapper = document.createElement("div");
    this.$form = document.createElement("form");
    this.$firstName = document.createElement("input");
    this.$lastName = document.createElement("input");
    this.$email = document.createElement("input");
    this.$message = document.createElement("textarea");
    this.$submitButton = document.createElement("button");
  }

  /**
   * Contact Modal creation
   */
  createContactFields(id, $field, value) {
    const $fieldWrapper = document.createElement("div");
    $fieldWrapper.classList.add("field-group", id);

    $field.id = id;
    $field.placeholder = value;
    $field.required = true;
    $field.setAttribute("tabindex", "1");

    const $label = document.createElement("label");
    $label.id = "label-" + id;
    $label.setAttribute("for", id);
    $label.textContent = value;

    $fieldWrapper.append($label, $field);

    return $fieldWrapper;
  }

  createContactForm(photographerName) {
    const fields = [
      {
        id: "firstName",
        field: this.$firstName,
        value: "Votre Prénom",
      },
      {
        id: "laststName",
        field: this.$lastName,
        value: "Votre Nom",
      },
      {
        id: "email",
        field: this.$email,
        value: "Votre Email",
      },
      {
        id: "message",
        field: this.$message,
        value: "Votre Message",
      },
    ];

    this.$submitButton.classList.add("contact_button");
    this.$submitButton.ariaLabel = "Soumettre le formulaire de contact";
    this.$submitButton.textContent = "Envoyer";
    this.$submitButton.setAttribute("tabindex", "1");

    fields.map((field) =>
      this.$form.appendChild(
        this.createContactFields(field.id, field.field, field.value)
      )
    );

    this.$form.appendChild(this.$submitButton);
    this.$form.setAttribute("tabindex", "1");
    this.$form.setAttribute(
      "aria-label",
      `Formulaire de contact de ${photographerName}`
    );
    return this.$form;
  }

  createContactModal(title, photographerName) {
    this.$contactWrapper.classList.add("contact__wrapper");
    const $contactContent = document.createElement("div");
    $contactContent.classList.add("contact__wrapper__content");
    const $form = this.createContactForm(photographerName);

    this.$contactWrapper.appendChild($form);

    this.logForm();
    return this.createModal(
      this._id,
      title + photographerName,
      this.$contactWrapper
    );
  }

  /**
   * Contact Modal functionalities
   */
  logForm() {
    const that = this;
    this.$form.addEventListener("submit", function (e) {
      e.preventDefault();
      console.log(`
        Prénom: ${that.$firstName.value}
        Nom: ${that.$lastName.value}
        Email: ${that.$email.value}
        Message: ${that.$message.value}
    `);
      that.closeModal();
    });
  }
}
