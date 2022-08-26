class MediaFactory {
  constructor(data, index) {
    if (data.hasOwnProperty("image")) {
      return new Image(data, index);
    }
    if (data.hasOwnProperty("video")) {
      return new Video(data, index);
    } else {
      throw "format de type inconnu";
    }
  }
}
