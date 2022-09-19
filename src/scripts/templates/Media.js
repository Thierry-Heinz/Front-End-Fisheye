/**
 *
 * Media Template
 *
 */

export default class Media {
  constructor(data, index, photographerModel, lightboxModel) {
    this._id = data.id;
    this._photographerId = data.photographerId;
    this.title = data.title;
    this.likes = data.likes;
    this.date = data.date;
    this._price = data.price;
    this._index = index;
    this.$wrapper = document.createElement("article");
    this.photographerModel = photographerModel;
    this.lightboxModel = lightboxModel;
    this._mediaId = `media-${this._id}`;
    this._url = `./assets/medias/`;
    this.liked = false;
  }

  /**
   * Media creation
   */

  // Create the media card, conditionally for each type.
  createMediaCard(type, src) {
    this.$wrapper.classList.add("media-card", `${type}-card`);
    this.$wrapper.ariaLabel = `${type} Card`;
    this.$wrapper.setAttribute("aria-label", "média " + this.title);

    if (type === "image") {
      var $header = `
			<header class="image-card__thumbnail media-card__header">
			  <a class="image-card__link open-lightbox" aria-label="Voir en grand la ${
          type === "image" ? "Photo " : "Vidéo "
        } ${this.title} par ${this.photographerModel.name}" data-index="${
        this._index
      }" href="#">
				  <img class="image" alt="Photo ${this.title}" src="${
        this._url
      }gallery/${src}" />
			  </a>
			</header>`;
    } else if (type === "video") {
      var $header = `
			<header class="video-card__thumbnail media-card__header">
				<a class="video-card__link open-lightbox" data-index="${this._index}" href="#">
						<video class="video" muted >
					<source src="${this._url}gallery/${src}" type="video/mp4">
					Désolé votre navigateur ne supporte pas ce type de media
				</video>
				</a>
			</header>`;
    } else {
      throw "Format de type inconnu";
    }

    const $footer = `
		<footer class="media-card__footer">
			<h3 class="title" id="title-${this._mediaId}" >${this.title}</h3>
      <div class="likes" aria-label="likes de la photo ${this.title} par ${
      this.photographerModel.name
    }">
        <span class="likes-number" aria-label="Nombre de likes de la photo ${
          this.title
        } par ${this.photographerModel.name}">${this.likes}</span>
        <button class="like-button ${
          this.liked ? "liked" : ""
        }" aria-label="Aimer la ${type === "image" ? "Photo " : "Vidéo "} ${
      this.title
    } par ${this.photographerModel.name}">
          <svg role="img" class="heart-icon" aria-labelledby="heartTitle-${
            this._mediaId
          }">
            <title id="heartTitle-${this._mediaId}">Liker</title>
            <use xlink:href="#heart" ></use>
          </svg>
        </button>
      </div>
		</footer>
	`;

    this.$wrapper.innerHTML = $header + $footer;
    this.openLightbox();
    this.handleLikes(type);
    return this.$wrapper;
  }

  /**
   * Media functionalities
   */

  //click listener of the like button of the media. Call the updateCardMediaLikes method of the media object and the counterPhotographerLikes method of the photographer object.
  handleLikes(type) {
    const that = this;
    that.$wrapper
      .querySelector(".like-button")
      .addEventListener("click", function () {
        if (this.classList.contains("liked")) {
          this.classList.remove("liked");
          this.setAttribute(
            "aria-label",
            `Aimer la ${type === "image" ? "Photo " : "Vidéo "} ${
              that.title
            } par ${that.photographerModel.name}`
          );
          that.likes--;
          that.updateCardMediaLikes();
          that.liked = false;
          that.photographerModel.counterPhotographerLikes("minus");
        } else {
          this.classList.add("liked");
          this.setAttribute(
            "aria-label",
            `J'aime la ${type === "image" ? "Photo " : "Vidéo "} ${
              that.title
            } par ${that.photographerModel.name}`
          );
          that.likes++;
          that.updateCardMediaLikes();
          that.liked = true;
          that.photographerModel.counterPhotographerLikes("plus");
        }
      });
  }

  // click listener for opening the lightbox calling the openLightbox method of the lightbox object.
  openLightbox() {
    const that = this;
    that.$wrapper
      .querySelector(".open-lightbox")
      .addEventListener("click", function (e) {
        e.preventDefault();
        const mediaIndex = this.dataset.index;
        that.lightboxModel.openLightbox(mediaIndex);
      });
  }

  // Visually update the number of likes of the media
  updateCardMediaLikes() {
    const $likesWrapper = this.$wrapper.querySelector(".likes-number");
    $likesWrapper.innerText = this.likes;
  }
}
