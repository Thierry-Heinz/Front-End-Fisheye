/***
 *
 * Photographer Factory
 *
 *  */

export default function photographerFactory(data, likesSum, contactModel) {
  /***
   *
   * Defining variables for Photographer page
   *
   *  */

  const { name, portrait, city, country, tagline, price, id } = data;
  const picture = `./assets/photographers/${portrait}`;

  const $notification = document.createElement("div");

  /**
   * Photographer page getter creation
   */

  const createCard = () => {
    const $article = document.createElement("article");
    $article.classList.add("card", "card__photographer");
    $article.ariaLabel = name;
    $article.setAttribute("aria-labelledby", "photograph-title-" + id);
    return $article;
  };

  const createCardHeader = () => {
    const $link = document.createElement("a");
    $link.classList.add("card__header");
    $link.href = `./photographer.html?id=${id}`;
    $link.ariaLabel = `Voir la page du photographe ${name}`;
    return $link;
  };
  const createPortrait = () => {
    const $img = document.createElement("img");
    $img.setAttribute("src", picture);
    $img.alt = "portrait de " + name;
    $img.classList.add("portrait", "rounded");
    return $img;
  };
  const createPhotographerName = () => {
    const $h2 = document.createElement("h3");
    $h2.textContent = name;
    $h2.classList.add("name");
    $h2.id = "photograph-title-" + id;
    return $h2;
  };

  const createCardBody = () => {
    const $div = document.createElement("div");
    $div.classList.add("card__body");
    return $div;
  };
  const createLocation = () => {
    const $h3 = document.createElement("h4");
    $h3.classList.add("location");
    $h3.textContent = `${city}, ${country}`;
    return $h3;
  };
  const createSlogan = () => {
    const $p = document.createElement("p");
    $p.classList.add("slogan");
    $p.textContent = tagline;
    return $p;
  };
  const createQuote = () => {
    const $p = document.createElement("p");
    $p.classList.add("quote");
    $p.textContent = `${price}€/jour`;
    return $p;
  };

  const createHeaderText = () => {
    const $div = document.createElement("div");
    $div.classList.add("photograph-header__text");

    const photographerName = createPhotographerName();
    const location = createLocation();
    const slogan = createSlogan();

    $div.append(photographerName, location, slogan);

    return $div;
  };

  const createHeaderSectionTitle = () => {
    const $h2 = document.createElement("h2");
    $h2.classList.add("photograph-header__title", "screen-reader");
    $h2.textContent = "Entête de la page du photographe: " + name;
    return $h2;
  };

  /**
   * Photographer page getter creation
   */

  function getUserCardDOM() {
    const $card = createCard();
    const $cardHeader = createCardHeader();
    const $cardBody = createCardBody();
    const $img = createPortrait();
    const $photographerName = createPhotographerName();
    const $location = createLocation();
    const $slogan = createSlogan();
    const $quote = createQuote();

    $cardHeader.append($img, $photographerName);
    $cardBody.append($location, $slogan, $quote);
    $card.append($cardHeader, $cardBody);

    return $card;
  }

  function getUserHeaderDOM() {
    const $button = document.querySelector(".contact_button");
    const $sectionHeader = createHeaderSectionTitle();
    const $headerText = createHeaderText();
    const $headerPortrait = createPortrait();

    $button.before($sectionHeader, $headerText);
    $button.after($headerPortrait);
  }

  /**
   *
   * Photographer page functions
   *
   */

  const updatePageTitle = () =>
    (document.title = `FishEye - Photographe ${name}`);

  function stickyNotification() {
    const $body = document.querySelector("body");
    $notification.classList.add("notification");
    $notification.ariaLabel = `Informations sur ${name}`;

    const $likes = `
    <div class="likes" aria-label="likes de ${name}">
      <span class="likes-number">${likesSum}</span>
      <svg role="img" class="heart-icon" aria-labelledby="heartTitle-global">
          <title id="heartTitle-global">${likesSum} Likes</title>
          <use xlink:href="#heart" ></use>
        </svg>
    </div>
    `;

    const $quote = `<span aria-label="tarif de ${name}" class="quote">${price}€/jour</span>`;
    $notification.innerHTML = $likes + $quote;

    $body.appendChild($notification);
  }

  function counterPhotographerLikes(operation) {
    if (operation == "minus") {
      likesSum -= 1;
    } else if (operation == "plus") {
      likesSum += 1;
    } else {
      throw "Unknown operation";
    }
    updatePhotographerLikes();
  }
  function updatePhotographerLikes() {
    const $notificationLikesWrapper =
      $notification.querySelector(".likes-number");
    $notificationLikesWrapper.innerText = likesSum;
  }

  function openContactModal() {
    const $contactButton = document.querySelector(".contact_button");
    $contactButton.addEventListener("click", function (e) {
      e.preventDefault();
      contactModel.openModal();
    });
  }

  return {
    getUserCardDOM,
    name,
    getUserHeaderDOM,
    updatePageTitle,
    stickyNotification,
    counterPhotographerLikes,
    openContactModal,
  };
}
