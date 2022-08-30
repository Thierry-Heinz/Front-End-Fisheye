import ContactModal from "../models/ContactModal";
import LightboxModal from "../models/LightboxModal";

export default class ModalFactory {
  constructor(type) {
    if (type === "contact") {
      return new ContactModal();
    } else if (type === "lightbox") {
      return new LightboxModal();
    } else {
      throw "Type de modal inconnue";
    }
  }
}
