class Video extends Media {
  constructor(data, index, photographerModel) {
    super(data, index, photographerModel);
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
