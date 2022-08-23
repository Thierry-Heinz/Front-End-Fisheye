class Video {
  constructor(data) {
    this._id = data.id;
    this._photographerId = data.photographerId;
    this._title = data.title;
    this._video = data.video;
    this._likes = data.likes;
    this._date = data.date;
    this._price = data.price;
  }
  createCard() {
    const $wrapper = document.createElement("div");
    $wrapper.classList.add("media-card", "video-card");

    $wrapper.ariaLabel = "Photo Card";
    $wrapper.setAttribute("aria-labelledby", this._title);

    const videoCard = `
		<header class="video-card__thumbnail media-card__header">
			<video controls class="video"
        <source src="/assets/medias/${this._video}" type="video/mp4">
        Désolé votre navigateur ne supporte pas ce type de media
      </video>
		</header>
		<footer class="media-card__footer">
			<h4 class="title" id="${this._title}" >${this._title}</h4>
      <div class="likes">
        <span class="likes-number">
        ${this._likes}
        </span>
        <img class="likes-icon" src="/assets/icons/heart.svg" />
      </div>
		</footer>
	`;
    $wrapper.innerHTML = videoCard;
    return $wrapper;
  }
}
