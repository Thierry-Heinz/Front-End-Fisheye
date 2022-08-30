import Media from "../templates/Media";

export default class Image extends Media {
  constructor(data, index, photographerModel, lightboxModel) {
    super(data, index, photographerModel, lightboxModel);
    this._type = "image";
    this._src = data.image;
  }
  createCard() {
    return this.createMediaCard(this._type, this._src);
  }
  createSlide() {
    return this.createMediaSlide(this._type, this._src);
  }
}
