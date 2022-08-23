function photographerFactory(data) {
  const { name, portrait, city, country, tagline, price, id } = data;

  const picture = `assets/photographers/${portrait}`;

  const createCard = () => {
    const article = document.createElement("article");
    article.classList.add("card", "card__photographer");
    article.ariaLabel = "Photographer Card";
    article.setAttribute("aria-labelledby", name);
    return article;
  };

  const createCardHeader = () => {
    const link = document.createElement("a");
    link.classList.add("card__header");
    link.href = `/photographer.html?id=${id}`;
    return link;
  };
  const createPortrait = () => {
    const img = document.createElement("img");
    img.setAttribute("src", picture);
    img.alt = name;
    img.classList.add("portrait", "rounded");
    return img;
  };
  const createPhotographerName = () => {
    const h2 = document.createElement("h2");
    h2.textContent = name;
    h2.classList.add("name");
    h2.id = name;
    return h2;
  };

  const createCardBody = () => {
    const div = document.createElement("div");
    div.classList.add("card__body");
    return div;
  };
  const createLocation = () => {
    const h3 = document.createElement("h3");
    h3.classList.add("location");
    h3.textContent = `${city}, ${country}`;
    return h3;
  };
  const createSlogan = () => {
    const p = document.createElement("p");
    p.classList.add("slogan");
    p.textContent = tagline;
    return p;
  };
  const createQuote = () => {
    const p = document.createElement("p");
    p.classList.add("quote");
    p.textContent = `${price}€/jour`;
    return p;
  };

  function getUserCardDOM() {
    const card = createCard();
    const cardHeader = createCardHeader();
    const cardBody = createCardBody();
    const img = createPortrait();
    const photographerName = createPhotographerName();
    const location = createLocation();
    const slogan = createSlogan();
    const quote = createQuote();

    cardHeader.append(img, photographerName);
    cardBody.append(location, slogan, quote);
    card.append(cardHeader, cardBody);

    return card;
  }

  return { name, picture, getUserCardDOM };
}
