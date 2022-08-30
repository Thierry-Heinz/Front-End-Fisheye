import Image from "../models/Image";
import Video from "../models/Video";

export default class MediaFactory {
  constructor(data, index, photographerModel, lightboxModel) {
    if (data.hasOwnProperty("image")) {
      return new Image(data, index, photographerModel, lightboxModel);
    }
    if (data.hasOwnProperty("video")) {
      return new Video(data, index, photographerModel, lightboxModel);
    } else {
      throw "Format de type inconnu";
    }
  }
}
