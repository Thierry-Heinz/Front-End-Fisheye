import SorterApi from "../api/SorterApi";

/**
 *
 * Sorter
 *
 */

export default class Sorter {
  constructor(medias) {
    this._Medias = medias;
    this.$wrapper = document.createElement("section");
    this.$sorterFormWrapper = document.createElement("div");
    this.$sorterForm = document.createElement("form");
    this.$mediaWrapper = document.querySelector(".photograph-media");
    this.$photographHeader = document.querySelector(".photograph-header");
    this.SorterApi = new SorterApi();
  }

  /**
   * Sorter creation
   */
  createControlsSectionTitle() {
    const $h2 = document.createElement("h2");
    $h2.classList.add("photograph-controls__title", "screen-reader");
    $h2.textContent = "Trier les médias de: " + name;
    return $h2;
  }
  createSorterForm() {
    const $formContent = `
                <label for="sorter-select">Trier par</label>
                <select name="sorter-select" id="sorter-select">
                    <option value="">Aucun Tri</option>
                    <option value="likes">Popularité</option>
                    <option value="date">Date</option>
                    <option value="title">Titre</option>
                </select>
		`;
    this.$sorterForm.classList.add("sorter-form");
    this.$sorterForm.setAttribute("action", "#");
    this.$sorterForm.setAttribute("method", "POST");
    this.$sorterForm.setAttribute("tabindex", "1");

    this.$wrapper.classList.add("photograph-controls");
    this.$wrapper.setAttribute("tabindex", "1");

    this.$sorterForm.innerHTML = $formContent;

    this.$sorterFormWrapper.classList.add("sorter-form-wrapper");
    this.$sorterFormWrapper.append(this.$sorterForm);

    const $sectionTitle = this.createControlsSectionTitle();

    this.$wrapper.append($sectionTitle, this.$sorterFormWrapper);

    this.onChangeSorter();
    this.$photographHeader.after(this.$wrapper);
  }

  /**
   * Sort functionalities
   */
  async sorterMedias(value) {
    this.clearMedias();
    if (value == "") {
      this._Medias.forEach((media) =>
        this.$mediaWrapper.appendChild(media.createCard())
      );
    } else {
      const sortedMedias = await this.SorterApi.sorter(this._Medias, value);
      sortedMedias.forEach((media) =>
        this.$mediaWrapper.appendChild(media.createCard())
      );
    }
  }
  onChangeSorter() {
    const that = this;
    this.$sorterForm.addEventListener("change", function (e) {
      const value = e.target.value;
      that.sorterMedias(value);
    });
  }
  clearMedias() {
    this.$mediaWrapper.innerHTML = "";
  }
}
