async function init() {
  //Retrieve the photograph id in the urlParams
  const id = new GetParamId(window.location.search).getId();

  // Retrieve all the medias
  const mediasApi = new MediaApi("/data/photographers.json");
  const medias = await mediasApi.getMedias();

  // Retrieve all the photographers
  const photographersApi = new PhotographersApi("/data/photographers.json");
  const photographers = await photographersApi.getPhotographers();

  // Find the right photographer based on the photograph id
  const currentPhotographer = photographers.find((el) => el.id == id);
  // Filter all the media based on the id
  const photographerMedias = medias.filter((el) => el.photographerId == id);

  // Reference the Media wrapper
  const $mediaWrapper = document.querySelector(".photograph-media");
  // Reference the lightbox content wrapper
  const $lightboxContentWrapper = document.querySelector(".lightbox-content");

  // Calculate the sum of likes of all the media for the photograph
  const photographerLikesSum = photographerMedias.reduce(
    (acc, curr) => acc + curr.likes,
    0
  );

  // Instanciate the photograph model
  const photographerModel = photographerFactory(
    currentPhotographer,
    photographerLikesSum
  );

  //Instanciate the media (and sort between Image and Video via the MediaFactory)
  const MediasObj = photographerMedias.map(
    (media, index) => new MediaFactory(media, index, photographerModel)
  );

  // populate the media gallery and the lightbox
  MediasObj.forEach((media) => {
    $mediaWrapper.appendChild(media.createCard());
    $lightboxContentWrapper.appendChild(media.createSlide());
  });

  // Call all the methods to display the photograph Infos
  photographerModel.getUserHeaderDOM();
  photographerModel.changeTitlePagePhotographer();
  photographerModel.updateContactModalTitle();
  photographerModel.stickyNotification();
}

init();
