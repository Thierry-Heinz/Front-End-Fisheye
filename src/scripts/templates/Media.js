export default class Media {
  constructor(data, index, photographerModel, lightboxModel) {
    this._id = data.id;
    this._photographerId = data.photographerId;
    this._title = data.title;
    this.likes = data.likes;
    this._date = data.date;
    this._price = data.price;
    this._index = index;
    this.$wrapper = document.createElement("article");
    this.photographerModel = photographerModel;
    this.lightboxModel = lightboxModel;
    this._mediaId = `media-${this._id}`;
    this._url = `assets/medias/`;
  }

  createMediaCard(type, src) {
    this.$wrapper.classList.add("media-card", `${type}-card`);
    this.$wrapper.ariaLabel = `${type} Card`;
    this.$wrapper.setAttribute("aria-labelledby", this._mediaId);

    if (type === "image") {
      var $header = `
			<header class="image-card__thumbnail media-card__header">
			  <a class="image-card__link open-lightbox" data-index="${
          this._index
        }" href="#">
				  <img class="image" alt="${this._title}" src="${this._url + src}" />
			  </a>
			</header>`;
    } else if (type === "video") {
      var $header = `
			<header class="video-card__thumbnail media-card__header">
				<a class="video-card__link open-lightbox" data-index="${this._index}" href="#">
						<video class="video" muted >
					<source src="${this._url + src}" type="video/mp4">
					Désolé votre navigateur ne supporte pas ce type de media
				</video>
				</a>
			</header>`;
    } else {
      throw "Format de type inconnu";
    }

    const $footer = `
		<footer class="media-card__footer">
			<h4 class="title" id="${this._mediaId}" >${this._title}</h4>
      <div class="likes" aria-label="likes">
        <span class="likes-number">
        ${this.likes}
        </span>
        <button class="like-button" aria-label="Aimer cette photo">
          <svg role="img" class="heart-icon" aria-labelledby="heartTitle">
            <title id="heartTitle">Liker</title>
            <use xlink:href="#heart" ></use>
          </svg>
        </button>
      </div>
		</footer>
	`;

    this.$wrapper.innerHTML = $header + $footer;
    this.openLightbox();
    this.handleLikes();
    return this.$wrapper;
  }

  handleLikes() {
    const that = this;
    that.$wrapper
      .querySelector(".like-button")
      .addEventListener("click", function () {
        if (this.classList.contains("liked")) {
          this.classList.remove("liked");
          this.ariaLabel = "Aimer cette Photo";
          that.likes--;
          that.updateCardMediaLikes();
          that.photographerModel.counterPhotographerLikes("minus");
        } else {
          this.classList.add("liked");
          this.ariaLabel = "J'aime cette Photo";
          that.likes++;
          that.updateCardMediaLikes();
          that.photographerModel.counterPhotographerLikes("plus");
        }
      });
  }

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

  updateCardMediaLikes() {
    const $likesWrapper = this.$wrapper.querySelector(".likes-number");
    $likesWrapper.innerText = this.likes;
  }
}
