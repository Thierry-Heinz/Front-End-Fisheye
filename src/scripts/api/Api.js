/***
 *
 * Api
 *
 */

// fetch the json file and retrieve the right array
class Api {
  constructor(url) {
    this._url = url;
  }

  async get(resObject) {
    return fetch(this._url, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      mode: "no-cors",
    })
      .then((res) => res.json())
      .then((res) => {
        return res[resObject];
      })
      .catch((err) => {
        console.log("api error:", err);
      });
  }
}

// fetch the array containing all the photographers in the json
export class PhotographersApi extends Api {
  constructor(url) {
    super(url);
  }
  async getPhotographers() {
    return await this.get("photographers");
  }
}

// fetch the array containing all the medias in the json
export class MediaApi extends Api {
  constructor(url) {
    super(url);
  }
  async getMedias() {
    return await this.get("media");
  }
}
