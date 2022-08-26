class MediaFactory {
  constructor(data, index, photographerModel) {
    if (data.hasOwnProperty("image")) {
      return new Image(data, index, photographerModel);
    }
    if (data.hasOwnProperty("video")) {
      return new Video(data, index, photographerModel);
    } else {
      throw "format de type inconnu";
    }
  }
}
