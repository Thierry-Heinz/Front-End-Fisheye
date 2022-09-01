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
  createSorterForm() {
    const $formContent = `
		 <form class="sorter-form" action="#" method="POST">
                <label for="sorter-select">Trier par</label>
                <select name="sorter-select" id="sorter-select">
                    <option value="">Aucun Tri</option>
                    <option value="likes">Popularité</option>
                    <option value="date">Date</option>
                    <option value="title">Titre</option>
                </select>
            </form>
		`;
    this.$sorterForm.classList.add("sorter-form");
    this.$sorterForm.setAttribute("action", "#");
    this.$sorterForm.setAttribute("method", "POST");

    this.$wrapper.classList.add("photograph-controls");

    this.$sorterForm.innerHTML = $formContent;

    this.$sorterFormWrapper.classList.add("sorter-form-wrapper");
    this.$sorterFormWrapper.append(this.$sorterForm);
    this.$wrapper.append(this.$sorterFormWrapper);

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
