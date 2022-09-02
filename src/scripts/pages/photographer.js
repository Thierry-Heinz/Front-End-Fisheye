import { GetParamId } from "../api/GetParams";
import { PhotographersApi, MediaApi } from "../api/Api";
import photographerFactory from "../factories/photographerFactory";
import MediaFactory from "../factories/MediasFactory";
import ModalFactory from "../factories/ModalFactory";
import Sorter from "../templates/Sorter";

async function init() {
  //Retrieve the photograph id in the urlParams
  const id = new GetParamId(window.location.search).getId();

  // Retrieve all the medias
  const medias = await new MediaApi("./data/photographers.json").getMedias();

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

  // Instantiate the lightbox and the contact modal
  const lightboxModel = new ModalFactory("lightbox");
  const contactModel = new ModalFactory("contact");

  // Instantiate the photographer model
  const photographerModel = photographerFactory(
    currentPhotographer,
    photographerLikesSum,
    contactModel
  );

  const createMediaGalleryTitle = () => {
    const $h2 = document.createElement("h2");
    $h2.classList.add("photograph-media__title", "screen-reader");
    $h2.textContent = "Gallery des médias de: " + currentPhotographer.name;
    return $h2;
  };

  $mediaWrapper.appendChild(createMediaGalleryTitle());

  //Instantiate the media (and sort between Image and Video via the MediaFactory)
  const MediasObj = photographerMedias.map(
    (media, index) =>
      new MediaFactory(media, index, photographerModel, lightboxModel)
  );

  //Populate the media gallery
  MediasObj.forEach((media) => {
    $mediaWrapper.appendChild(media.createCard());
  });

  // Instantiate the lightbox and populate the lightbox
  lightboxModel.createLightbox(MediasObj);
  // Instantiate the contact modal
  contactModel.createContactModal("Contactez " + currentPhotographer.name);

  // Instantiate the sorter form and insert it in the page
  const sorterSection = new Sorter(MediasObj);
  sorterSection.createSorterForm();

  // Call all the methods to display the photograph Infos and functionalities
  photographerModel.getUserHeaderDOM();
  photographerModel.updatePageTitle();
  photographerModel.stickyNotification();
  photographerModel.openContactModal();
}

init();
