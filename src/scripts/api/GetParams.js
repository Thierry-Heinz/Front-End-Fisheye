/**
 *
 * Get the url params
 *
 */

//get the url param for the given param, contained in the window.location object (given at the instantiation of the class).
class GetParams {
  constructor(windowLocation) {
    this._windowLocation = windowLocation;
  }
  get(param) {
    const urlParams = new URLSearchParams(this._windowLocation);
    return urlParams.has(param) ? urlParams.get(param) : "no id";
  }
}

// get the url param id.
export class GetParamId extends GetParams {
  constructor(windowLocation) {
    super(windowLocation);
  }
  getId() {
    return this.get("id");
  }
}
