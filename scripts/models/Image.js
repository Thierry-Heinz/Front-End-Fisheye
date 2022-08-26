class Image extends Media {
  constructor(data, index, photographerModel) {
    super(data, index, photographerModel);
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
