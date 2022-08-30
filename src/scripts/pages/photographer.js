import { GetParamId } from "../api/GetParams";
import { PhotographersApi, MediaApi } from "../api/Api";
import photographerFactory from "../factories/photographerFactory";
import MediaFactory from "../factories/MediasFactory";
import ModalFactory from "../factories/ModalFactory";

async function init() {
  //Retrieve the photograph id in the urlParams
  const id = new GetParamId(window.location.search).getId();

  // Retrieve all the medias
  const medias = await new MediaApi("./data/photographers.json").getMedias();
  //const medias = await mediasApi.getMedias();

  // Retrieve all the photographers
  const photographers = await new PhotographersApi(
    "./data/photographers.json"
  ).getPhotographers();

  // Find the right photographer based on the photograph id
  const currentPhotographer = photographers.find((el) => el.id == id);
  // Filter all the media based on the id
  const photographerMedias = medias.filter((el) => el.photographerId == id);

  // Reference the Media wrapper
  const $mediaWrapper = document.querySelector(".photograph-media");

  // Calculate the sum of likes of all the media of this photograph
  const photographerLikesSum = photographerMedias.reduce(
    (acc, curr) => acc + curr.likes,
    0
  );

  const lightboxModel = new ModalFactory("lightbox");

  // Instantiate the photographer model
  const photographerModel = photographerFactory(
    currentPhotographer,
    photographerLikesSum
    //contactModel
  );

  //Instantiate the media (and sort between Image and Video via the MediaFactory)
  const MediasObj = photographerMedias.map(
    (media, index) =>
      new MediaFactory(media, index, photographerModel, lightboxModel)
  );

  //Populate the media gallery and the lightbox
  MediasObj.forEach((media) => {
    $mediaWrapper.appendChild(media.createCard());
  });

  lightboxModel.createLightbox(MediasObj);

  // Call all the methods to display the photograph Infos
  photographerModel.getUserHeaderDOM();
  photographerModel.updatePageTitle();
  // photographerModel.updateContactModalTitle();
  photographerModel.stickyNotification();
}

init();
