const findById = (array, currentId) => array.find((el) => el.id == currentId);

const filterByPhotographerId = (array, currentId) =>
  array.filter((el) => el.photographerId == currentId);

async function init() {
  //Retrieve the id in the urlParams
  const id = new GetParamId(window.location.search).getId();

  // Retrieve and display all the media of the single photographer
  const mediasApi = new MediaApi("/data/photographers.json");
  const medias = await mediasApi.getMedias();

  const photographerMedias = filterByPhotographerId(medias, id);
  const $mediaWrapper = document.querySelector(".photograph-media");
  const MediasObj = photographerMedias.map(
    (media, index) => new MediaFactory(media, index)
  );

  console.log(MediasObj);
  MediasObj.forEach((media) => {
    $mediaWrapper.appendChild(media.createCard("image", media._src));
  });

  // Retrieve and display all the single photographer informations
  const photographersApi = new PhotographersApi("/data/photographers.json");
  const photographers = await photographersApi.getPhotographers();

  const currentPhotographer = findById(photographers, id);
  const $photographHeader = document.querySelector(".photograph-header");
  const photographerModel = photographerFactory(currentPhotographer, MediasObj);

  photographerModel.getUserHeaderDOM($photographHeader);
  photographerModel.changeTitlePagePhotographer();
  photographerModel.updateContactModalTitle();
  photographerModel.stickyNotification();

  // populateLightbox(filterByPhotographerId(medias, id));
}

init();
