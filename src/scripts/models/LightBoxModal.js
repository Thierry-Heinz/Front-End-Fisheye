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
  createSlide(type, title, slideId, url, src, index) {
    const $slideWrapper = document.createElement("article");
    $slideWrapper.classList.add("slide", `${type}-slide`);
    $slideWrapper.setAttribute("aria-labelledby", "title-" + slideId);
    $slideWrapper.setAttribute("data-index", index);

    const $slideContent = document.createElement("div");
    $slideContent.classList.add(`slide__content`);
    const $h4 = `<h3 id="title-${slideId}" class="slide-title" >${title}</h3>`;
    if (type === "image") {
      var $media = `<img class="image" alt="${title}" src="${url}lightbox/${src}" />`;
    } else if (type === "video") {
      var $media = `<video controls class="video">>
					<source src="${url}lightbox/${src}" type="video/mp4">
					Désolé votre navigateur ne supporte pas ce type de media
				</video>`;
    } else {
      throw "Format de type inconnu";
    }
    $slideContent.innerHTML = $media + $h4;
    $slideWrapper.append($slideContent);
    return $slideWrapper;
  }

  createLightboxControl(direction) {
    const $buttonControl = document.createElement("button");
    $buttonControl.classList.add("lightbox__wrapper__controls", direction);
    $buttonControl.ariaLabel = direction === "left" ? "précédente" : "suivante";
    $buttonControl.setAttribute("data-direction", direction);

    const $icon = `
          <svg role="img" class="${direction}-arrow-icon" aria-labelledby="${direction}-arrow-title">
            <title id="${direction}-arrow-title">Image ${
      direction === "left" ? "précédente" : "suivante"
    }</title>
            <use xlink:href="#${direction}-arrow" ></use>
          </svg>     
    `;
    $buttonControl.innerHTML = $icon;
    return $buttonControl;
  }

  createLightbox(medias) {
    this.$lightboxWrapper.classList.add("lightbox__wrapper");
    const $lightboxContent = document.createElement("div");
    $lightboxContent.classList.add("lightbox__wrapper__content");

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
    return this.createModal(this._id, this._title, this.$lightboxWrapper);
  }

  /**
   * Lightbox functionalities
   */
  openLightbox(index) {
    this.setActiveSlide(index);
    this.openModal();
  }
  setActiveSlide(slideIndex) {
    this.$slides.forEach((slide, index) => {
      index == slideIndex
        ? slide.classList.add("active")
        : slide.classList.remove("active");
    });
  }
  findActiveSlide() {
    return this.$slides.find((slide) => {
      return slide.classList.contains("active");
    }).dataset.index;
  }
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
  handleSlideButtons() {
    const that = this;
    const $navButtons = that.$lightboxWrapper.querySelectorAll(
      ".lightbox__wrapper__controls"
    );
    $navButtons.forEach(function (navButton) {
      navButton.addEventListener("click", function () {
        that.setActiveSlide(
          that.updateSlides(that.findActiveSlide(), this.dataset.direction)
        );
      });
    });
  }
  handleNavKeys() {
    const that = this;

    document.body.addEventListener("keydown", (e) => {
      if (that.$modalWrapper.ariaHidden == "false") {
        if (e.key == "ArrowLeft") {
          that.setActiveSlide(
            that.updateSlides(that.findActiveSlide(), "left")
          );
        } else if (e.key == "ArrowRight") {
          that.setActiveSlide(
            that.updateSlides(that.findActiveSlide(), "right")
          );
        }
      }
    });
  }
}
