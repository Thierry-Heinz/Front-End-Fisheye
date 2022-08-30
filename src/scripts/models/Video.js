import Media from "../templates/Media";

export default class Video extends Media {
  constructor(data, index, photographerModel, lightboxModel) {
    super(data, index, photographerModel, lightboxModel);
    this._type = "video";
    this._src = data.video;
  }
  createCard() {
    return this.createMediaCard(this._type, this._src);
  }
  createSlide() {
    return this.createMediaSlide(this._type, this._src);
  }
}
