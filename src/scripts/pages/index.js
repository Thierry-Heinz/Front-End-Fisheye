import { PhotographersApi } from "../api/Api";
import photographerFactory from "../factories/photographerFactory";

async function getPhotographers() {
  // retrieve the photographers data.
  const photographersApi = new PhotographersApi("./data/photographers.json");
  return await photographersApi.getPhotographers();
}

async function displayData(photographers) {
  const photographersSection = document.querySelector(".photographer_section");

  // populate the index page with the photographer card.
  photographers.forEach((photographer) => {
    const photographerModel = photographerFactory(photographer);
    const userCardDOM = photographerModel.getUserCardDOM();
    photographersSection.appendChild(userCardDOM);
  });
}

// initialize the index page.
async function init() {
  const photographers = await getPhotographers();
  displayData(photographers);
}

init();
