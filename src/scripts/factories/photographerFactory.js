export default function photographerFactory(data, likesSum) {
  /***
   *
   * Defining variables
   *
   *  */

  const { name, portrait, city, country, tagline, price, id } = data;
  const picture = `assets/photographers/${portrait}`;

  const $notification = document.createElement("div");

  /***
   *
   * Defining element creation functions
   *
   *  */

  const createCard = () => {
    const $article = document.createElement("article");
    $article.classList.add("card", "card__photographer");
    $article.ariaLabel = "Photographer Card";
    $article.setAttribute("aria-labelledby", name);
    return $article;
  };

  const createCardHeader = () => {
    const $link = document.createElement("a");
    $link.classList.add("card__header");
    $link.href = `/dist/photographer.html?id=${id}`;
    $link.ariaLabel = `Voir la page du photographe ${name}`;
    return $link;
  };
  const createPortrait = () => {
    const $img = document.createElement("img");
    $img.setAttribute("src", picture);
    $img.alt = name;
    $img.classList.add("portrait", "rounded");
    return $img;
  };
  const createPhotographerName = () => {
    const $h2 = document.createElement("h2");
    $h2.textContent = name;
    $h2.classList.add("name");
    $h2.id = name;
    return $h2;
  };

  const createCardBody = () => {
    const $div = document.createElement("div");
    $div.classList.add("card__body");
    return $div;
  };
  const createLocation = () => {
    const $h3 = document.createElement("h3");
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
    const div = document.createElement("div");
    div.classList.add("photograph-header__text");

    const photographerName = createPhotographerName();
    const location = createLocation();
    const slogan = createSlogan();

    div.append(photographerName, location, slogan);

    return div;
  };

  /***
   *
   * Defining get methods
   *
   *  */

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
    const button = document.querySelector(".contact_button");
    const headerText = createHeaderText();
    const headerPortrait = createPortrait();

    button.before(headerText);
    button.after(headerPortrait);
  }

  /**
   *
   * Photographer single page modification functions
   *
   */

  const updatePageTitle = () =>
    (document.title = `FishEye - Photographe ${name}`);

  const updateContactModalTitle = () =>
    (document.getElementById(
      "modal-title"
    ).innerHTML = `Contactez-moi ${name}`);

  function stickyNotification() {
    const $body = document.querySelector("body");
    $notification.classList.add("notification");
    $notification.ariaLabel = `Informations sur ${name}`;

    const $likes = `
    <div class="likes" aria-label="likes de ${name}">
      <span class="likes-number">${likesSum}</span>
      <svg role="img" class="heart-icon" aria-labelledby="heartTitle">
          <title id="heartTitle">${likesSum} Likes</title>
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

  return {
    getUserCardDOM,
    getUserHeaderDOM,
    updatePageTitle,
    updateContactModalTitle,
    stickyNotification,
    counterPhotographerLikes,
  };
}
