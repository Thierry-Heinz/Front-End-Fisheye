class Image {
  constructor(data) {
    this._id = data.id;
    this._photographerId = data.photographerId;
    this._title = data.title;
    this._image = data.image;
    this._likes = data.likes;
    this._date = data.date;
    this._price = data.price;
  }

  createCard() {
    const $wrapper = document.createElement("div");
    $wrapper.classList.add("media-card", "image-card");
    $wrapper.ariaLabel = "Photo Card";
    $wrapper.setAttribute("aria-labelledby", this._title);

    const $imageCard = `
    <header class="image-card__thumbnail media-card__header">
		  <a class="image-card__link" href="#">
			  <img class="image" alt="${this._title}" src="/assets/medias/${this._image}" />
		  </a>
    </header>
		<footer class="media-card__footer">
			<h4 class="title" id="${this._title}" >${this._title}</h4>
      <div class="likes">
        <span class="likes-number">
        ${this._likes}
        </span>
        <svg role="img" class="heart-icon" aria-labelledby="heartTitle">
          <title id="heartTitle">Icône de Coeur</title>
          <use xlink:href="#heart" ></use>
        </svg>
      </div>
		</footer>
	`;
    $wrapper.innerHTML = $imageCard;
    return $wrapper;
  }
}
