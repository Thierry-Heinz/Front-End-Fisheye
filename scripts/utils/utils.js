// Utility functions

const findById = (array, currentId) => {
  return array.find((el) => el.id == currentId);
};

const filterByPhotographerId = (array, currentId) => {
  return array.filter((el) => el.photographerId == currentId);
};

const changeTitlePage = (name) => {
  document.title = "FishEye - Photographe " + name;
};

const displayNotification = async (
  photographerMedias,
  photographerQuote,
  photographerName
) => {
  const $body = document.querySelector("body");
  const $notification = document.createElement("div");
  $notification.classList.add("notification");
  $notification.ariaLabel = "Informations sur " + photographerName;

  const likesSum = photographerMedias.reduce((acc, curr) => {
    return acc + curr.likes;
  }, 0);

  const $likes = `
    <div class="likes">
      <span class="likes-number">${likesSum}</span>
      <svg role="img" class="heart-icon" aria-labelledby="heartTitle">
          <title id="heartTitle">Icône de Coeur</title>
          <use xlink:href="#heart" ></use>
        </svg>
    </div>
    `;

  const $quote = `<span class="quote">${photographerQuote}€/jour</span>`;
  $notification.innerHTML = $likes + $quote;

  $body.appendChild($notification);
};
