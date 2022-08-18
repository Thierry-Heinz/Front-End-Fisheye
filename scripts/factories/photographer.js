function photographerFactory(data) {
  const { name, portrait, city, country, tagline, price, id } = data;

  const picture = `assets/photographers/${portrait}`;

  function getUserCardDOM() {
    const article = document.createElement("article");
    article.classList.add("photographer-card");
    article.ariaLabel = "Photographer Card";
    article.setAttribute("aria-labelledby", name);

    const link = document.createElement("a");
    link.classList.add("photographer-card__header");
    link.href = `/photographer.html?id=${id}`;

    const img = document.createElement("img");
    img.setAttribute("src", picture);
    img.alt = name;
    img.classList.add("portrait", "rounded");

    const cardBody = document.createElement("div");
    cardBody.classList.add("photographer-card__body");

    const photographerName = document.createElement("h2");
    photographerName.textContent = name;
    photographerName.classList.add("name");
    photographerName.id = name;

    const location = document.createElement("h3");
    location.textContent = `${city}, ${country}`;

    const slogan = document.createElement("p");
    slogan.textContent = tagline;

    const quote = document.createElement("p");
    quote.textContent = `${price}/jour`;

    link.append(img, photographerName);
    cardBody.append(location, slogan, quote);
    article.append(link, cardBody);

    return article;
  }
  return { name, picture, getUserCardDOM };
}
