/**
 *
 * Lightbox
 *
 */

import Modal from "../templates/Modal";

export default class LightBoxModal extends Modal {
  constructor() {
    super();
    this._title = "Lightbox";
    this._id = "lightbox_modal";
    this.$lightboxWrapper = document.createElement("div");
    this.$slides = [];
  }

  /**
   * Lightbox creation
   */
  // Create all the slide by duplicating all the medias objects
  createSlides(medias) {
    this.$slides = medias.map((media) => {
      const slideId = `slide-${media._id}`;
      const slide = this.createSlide(
        media._type,
        media.title,
        slideId,
        media._url,
        media._src,
        media._index
      );
      return slide;
    });
  }

  // Create each slide
  createSlide(type, title, slideId, url, src, index) {
    const $slideWrapper = document.createElement("article");
    $slideWrapper.classList.add("slide", `${type}-slide`);
    $slideWrapper.setAttribute("aria-labelledby", "title-" + slideId);
    $slideWrapper.setAttribute("aria-label", title);
    $slideWrapper.setAttribute("tabindex", "-1");
    $slideWrapper.setAttribute("data-index", index);

    const $slideContent = document.createElement("div");
    $slideContent.classList.add(`slide__content`);
    $slideContent.setAttribute("tabindex", "-1");
    const $h3 = `<h3 tabindex="1" id="title-${slideId}" class="slide-title" >${title}</h3>`;
    if (type === "image") {
      var $media = `<img class="image media" tabindex="1" alt="${title}" src="${url}lightbox/${src}" />`;
    } else if (type === "video") {
      var $media = `<video controls class="video media" tabindex="1">
					<source src="${url}lightbox/${src}" type="video/mp4">
					Désolé votre navigateur ne supporte pas ce type de media
				</video>`;
    } else {
      throw "Format de type inconnu";
    }
    $slideContent.innerHTML = $media + $h3;
    $slideWrapper.append($slideContent);
    return $slideWrapper;
  }

  // Create the navigation buttons for the carrousel
  createLightboxControl(direction) {
    const $buttonControl = document.createElement("button");
    $buttonControl.classList.add("lightbox__wrapper__controls", direction);
    $buttonControl.setAttribute(
      "aria-label",
      direction === "left" ? "Média précédent" : "Média suivant"
    );
    $buttonControl.setAttribute("data-direction", direction);
    $buttonControl.setAttribute("tabindex", "1");

    const $icon = `
          <svg role="img" class="${direction}-arrow-icon" aria-labelledby="${direction}-arrow-title">
            <title id="${direction}-arrow-title">Média ${
      direction === "left" ? "précédente" : "suivante"
    }</title>
            <use xlink:href="#${direction}-arrow" ></use>
          </svg>     
    `;
    $buttonControl.innerHTML = $icon;
    return $buttonControl;
  }

  // Create and populate the lightbox using createModal method of the modal object
  createLightbox(medias, name) {
    this.$lightboxWrapper.classList.add("lightbox__wrapper");
    this.$lightboxWrapper.setAttribute("tabindex", "-1");

    const $lightboxContent = document.createElement("div");
    $lightboxContent.classList.add("lightbox__wrapper__content");
    $lightboxContent.setAttribute("tabindex", "-1");

    const $lightboxControlLeft = this.createLightboxControl("left");
    const $lightboxControlRight = this.createLightboxControl("right");
    this.createSlides(medias);
    this.$slides.forEach((slide) => $lightboxContent.appendChild(slide));
    this.$lightboxWrapper.append(
      $lightboxControlLeft,
      $lightboxContent,
      $lightboxControlRight
    );
    this.handleSlideButtons();
    this.handleNavKeys();
    return this.createModal(
      this._id,
      `Carroussel des médias de ${name}`,
      this.$lightboxWrapper
    );
  }

  /**
   * Lightbox functionalities
   */
  // Display the lightbox using the openModal method of the modal object
  openLightbox(index) {
    this.setActiveSlide(index);
    this.openModal();
    const closeButton = document.querySelector("#lightbox_modal .close_button");
    closeButton.focus();
  }

  // set the active class on the right slide, given the exact index
  setActiveSlide(slideIndex) {
    this.$slides.forEach((slide, index) => {
      index == slideIndex
        ? slide.classList.add("active")
        : slide.classList.remove("active");
    });
  }

  // find the slide which has the active class
  findActiveSlide() {
    return this.$slides.find((slide) => {
      return slide.classList.contains("active");
    }).dataset.index;
  }

  // update the index depending of which direction is given by the user action. If one end of the array is reached, reset the index, to go indifinitely.
  updateSlides(index, direction) {
    //update index based on direction
    if (direction === "left") {
      index--;
    } else if (direction === "right") {
      index++;
    } else {
      throw "Not a good direction !";
    }

    const maxSlides = this.$slides.length - 1;
    // check if reach end of carousel
    if (index > maxSlides) {
      index = 0;
    } else if (index < 0) {
      index = maxSlides;
    }
    return index;
  }

  // click listeners of the carrousel navigation button
  handleSlideButtons() {
    const that = this;
    const $navButtons = that.$lightboxWrapper.querySelectorAll(
      ".lightbox__wrapper__controls"
    );
    $navButtons.forEach(function (navButton) {
      navButton.addEventListener("click", function () {
        that.changeSlide(this.dataset.direction);
      });
    });
  }

  // keyboard listeners for the carrousel navigation
  handleNavKeys() {
    const that = this;
    window.addEventListener("keydown", (e) => {
      if (that.$modalWrapper.getAttribute("aria-hidden") == "false") {
        if (e.code == "ArrowLeft") {
          that.changeSlide("left");
        } else if (e.code == "ArrowRight") {
          that.changeSlide("right");
        }
      }
    });
  }
  // Find the active slide, find the next slide, change the slide and focus on the new active slide.
  changeSlide(direction) {
    const activeSlide = this.findActiveSlide();
    this.setActiveSlide(this.updateSlides(activeSlide, direction));

    const newActiveSlide = this.findActiveSlide();
    this.$slides[newActiveSlide].querySelector(".media").focus();
  }
}
