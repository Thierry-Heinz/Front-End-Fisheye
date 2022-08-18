class GetParams {
  constructor(windowLocation) {
    this._windowLocation = windowLocation;
  }
  get(param) {
    const urlParams = new URLSearchParams(this._windowLocation);
    return urlParams.has(param) ? urlParams.get(param) : "no id";
  }
}

class GetParamId extends GetParams {
  constructor(windowLocation) {
    super(windowLocation);
  }
  getId() {
    return this.get("id");
  }
}
