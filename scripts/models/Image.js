class Image extends Media {
  constructor(data, index) {
    super(data, index);
    this._type = "image";
    this._src = data.image;
  }
  createCard() {
    return this.createMediaCard(this._type, this._src);
  }
}
