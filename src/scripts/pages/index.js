import { PhotographersApi } from "../api/Api";
import photographerFactory from "../factories/photographerFactory";

async function getPhotographers() {
  // Récupère les datas des photographes
  const photographersApi = new PhotographersApi("./data/photographers.json");
  return await photographersApi.getPhotographers();
}

async function displayData(photographers) {
  const photographersSection = document.querySelector(".photographer_section");

  photographers.forEach((photographer) => {
    const photographerModel = photographerFactory(photographer);
    const userCardDOM = photographerModel.getUserCardDOM();
    photographersSection.appendChild(userCardDOM);
  });
}

async function init() {
  const photographers = await getPhotographers();
  displayData(photographers);
}

init();
