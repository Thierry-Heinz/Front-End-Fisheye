class Media {
  constructor(data, index) {
    this._id = data.id;
    this._photographerId = data.photographerId;
    this._title = data.title;
    this.likes = data.likes;
    this._date = data.date;
    this._price = data.price;
    this._index = index;
  }
  createMediaCard(type, src) {
    const $wrapper = document.createElement("div");
    $wrapper.classList.add("media-card", `${type}-card`);
    $wrapper.ariaLabel = `${type} Card`;
    $wrapper.setAttribute("aria-labelledby", this._title);

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
    }

    const $footer = `
		<footer class="media-card__footer">
			<h4 class="title" id="${this._title}" >${this._title}</h4>
      <div class="likes" aria-label="likes">
        <span class="likes-number">
        ${this.likes}
        </span>
        <svg role="img" class="heart-icon" aria-labelledby="heartTitle">
          <title id="heartTitle">Liker</title>
          <use xlink:href="#heart" ></use>
        </svg>
      </div>
		</footer>
	`;

    $wrapper.innerHTML = $header + $footer;
    return $wrapper;
  }
}
