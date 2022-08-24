async function getPhotographers() {
  // Récupère les datas des photographes
  const photographersApi = new PhotographersApi("/data/photographers.json");
  return await photographersApi.getPhotographers();
}

async function displayPhotographer(currentPhotographer) {
  const photographWrapper = document.querySelector(".photograph-header");
  const photographerModel = photographerFactory(currentPhotographer);
  photographerModel.getUserHeaderDOM(photographWrapper);
}

async function displayMedias(photographerMedias) {
  const mediaWrapper = document.querySelector(".photograph-media");
  const Medias = photographerMedias.map((media) => new MediaFactory(media));

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

  displayPhotographer(findById(photographers, id));
  displayMedias(filterByPhotographerId(medias, id));

  changeTitlePage(findById(photographers, id).name);
  displayNotification(
    filterByPhotographerId(medias, id),
    findById(photographers, id).price,
    findById(photographers, id).name
  );
}

init();
