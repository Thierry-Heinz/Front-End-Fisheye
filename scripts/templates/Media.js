class Media {
  constructor(data, index, photographerModel) {
    this._id = data.id;
    this._photographerId = data.photographerId;
    this._title = data.title;
    this.likes = data.likes;
    this._date = data.date;
    this._price = data.price;
    this._index = index;
    this.$wrapper = document.createElement("div");
    this.photographerModel = photographerModel;
    this._slideId = `slide-${this._id}`;
    this._mediaId = `media-${this._id}`;
  }

  createMediaCard(type, src) {
    this.$wrapper.classList.add("media-card", `${type}-card`);
    this.$wrapper.ariaLabel = `${type} Card`;
    this.$wrapper.setAttribute("aria-labelledby", this._mediaId);

    if (type === "image") {
      var $header = `
			<header class="image-card__thumbnail media-card__header">
			  <a class="image-card__link" data-index="${this._index}" href="#">
				  <img class="image" alt="${this._title}" src="/assets/medias/${src}" />
			  </a>
			</header>`;
    } else if (type === "video") {
      var $header = `
			<header class="video-card__thumbnail media-card__header">
				<a class="video-card__link" data-index="${this._index}" href="#">
						<video controls class="video"
					<source src="/assets/medias/${src}" type="video/mp4">
					Désolé votre navigateur ne supporte pas ce type de media
				</video>
				</a>
			</header>`;
    } else {
      throw "Unknown media type";
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
    this.handleLikes();
    return this.$wrapper;
  }

  createMediaSlide(type, src) {
    const $slideWrapper = document.createElement("div");
    $slideWrapper.classList.add("slide", `${type}-slide`);
    $slideWrapper.setAttribute("aria-labelledby", this._slideId);
    $slideWrapper.setAttribute("data-index", this._index);

    const $h4 = `<h4 id="${this._slideId}">${this._title}</h4>`;

    if (type === "image") {
      var $media = `<img class="image" alt="${this._title}" src="/assets/medias/${src}" />`;
    } else if (type === "video") {
      var $media = `<video controls class="video"
					<source src="/assets/medias/${src}" type="video/mp4">
					Désolé votre navigateur ne supporte pas ce type de media
				</video>`;
    } else {
      throw "Unknown media type";
    }

    $slideWrapper.innerHTML = $media + $h4;
    return $slideWrapper;
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

  updateCardMediaLikes() {
    const $likesWrapper = this.$wrapper.querySelector(".likes-number");
    $likesWrapper.innerText = this.likes;
  }
}
