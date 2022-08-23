async function getPhotographers() {
  // Récupère les datas des photographes
  const photographersApi = new PhotographersApi("/data/photographers.json");
  return await photographersApi.getPhotographers();
}

async function displayPhotographer(photographers, photographerCurrentId) {
  const photographWrapper = document.querySelector(".photograph-header");
  const photographer = photographers.find(
    (el) => el.id == photographerCurrentId
  );
  const photographerModel = photographerFactory(photographer);
  photographerModel.getUserHeaderDOM(photographWrapper);
}

async function displayMedias(allMedias, photographerCurrentId) {
  const mediaWrapper = document.querySelector(".photograph-media");
  const filteredMedia = allMedias.filter(
    (el) => el.photographerId == photographerCurrentId
  );
  const Medias = filteredMedia.map((media) => new MediaFactory(media));

  Medias.forEach((media) => {
    mediaWrapper.appendChild(media.createCard());
  });
}

async function init() {
  const id = new GetParamId(window.location.search).getId();
  const photographersApi = new PhotographersApi("/data/photographers.json");
  const photographers = await photographersApi.getPhotographers();

  const mediasApi = new MediaApi("/data/photographers.json");
  const medias = await mediasApi.getMedias();

  displayPhotographer(photographers, id);
  displayMedias(medias, id);
}

init();
