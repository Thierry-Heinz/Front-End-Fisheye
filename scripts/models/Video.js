class Video extends Media {
  constructor(data, index) {
    super(data, index);
    this._type = "video";
    this._src = data.video;
  }
  createCard() {
    return this.createMediaCard(this._type, this._src);
  }
}
