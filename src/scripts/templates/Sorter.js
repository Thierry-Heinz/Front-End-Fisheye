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
    this.$sorterWrapper = document.createElement("div");
    this.$mediaWrapper = document.querySelector(".photograph-media");
    this.$photographHeader = document.querySelector(".photograph-header");
    this.$dropdownToggle = document.createElement("button");
    this.$dropdownMenu = document.createElement("ul");
    this.SorterApi = new SorterApi();
  }

  /**
   * Sorter creation
   */
  // Create the title of the sorter section
  createControlsSectionTitle(name) {
    const $h2 = document.createElement("h2");
    $h2.id = "photograph-controls__title";
    $h2.classList.add("photograph-controls__title", "screen-reader");
    $h2.textContent = "Trier les médias de " + name + " par:";
    return $h2;
  }
  //create the wrapper for the dropdown
  createDropdown() {
    const $dropdown = document.createElement("div");
    $dropdown.classList.add("dropdown");
    $dropdown.id = "sorter-select";
    $dropdown.setAttribute("aria-label", "Filtre des médias");
    $dropdown.setAttribute("tabindex", "1");
    return $dropdown;
  }
  //create the button that toggle the dropdown
  createdropdownToggle(obj) {
    this.$dropdownToggle.classList.add("dropdown-toggle");
    this.$dropdownToggle.setAttribute("data-value", obj.value);
    //this.$dropdownToggle.setAttribute("aria-label", "Filtrer les médias");
    this.$dropdownToggle.setAttribute("aria-expanded", "false");
    this.$dropdownToggle.setAttribute("aria-haspopup", "listbox");
    //this.$dropdownToggle.setAttribute("role", "button");

    const $textHolder = document.createElement("span");
    $textHolder.classList.add("text-holder");
    $textHolder.textContent = obj.text;

    const $icon = `
          <svg role="img" class="dropdown-arrow-icon up" aria-labelledby="dropdown-arrow-title">
            <title id="dropdown-arrow-title">Ouvrir le menu de tri</title>
            <use xlink:href="#dropdown-arrow" ></use>
          </svg>     
    `;

    this.$dropdownToggle.appendChild($textHolder);
    this.$dropdownToggle.innerHTML += $icon;

    return this.$dropdownToggle;
  }

  //create the list element that contain the sorter options
  createDropdownMenu(options) {
    this.$dropdownMenu.classList.add("sorter-select", "dropdown-menu");
    this.$dropdownMenu.setAttribute("role", "listbox");
    this.$dropdownMenu.setAttribute("tabindex", "-1");
    this.$dropdownMenu.setAttribute("aria-activedescendant", "option0");
    this.$dropdownMenu.setAttribute("aria-owns", "option0");
    this.$dropdownMenu.setAttribute("aria-roledescription", "Trier les médias");
    this.$dropdownMenu.setAttribute("aria-labelledBy", "listbox-label");
    //---
    options.forEach((option, index) => {
      const $li = document.createElement("li");
      $li.setAttribute("role", "listitem");
      $li.classList.add("dropdown-item");
      $li.setAttribute("data-value", option.value);
      $li.setAttribute("tabindex", "1");
      $li.id = "option" + index;

      const $textHolder = document.createElement("span");
      $textHolder.classList.add("text-holder");
      $textHolder.textContent = option.text;

      $li.appendChild($textHolder);

      const $icon = `
          <svg role="img" class="dropdown-arrow-icon down" aria-labelledby="dropdown-arrow-title-${index}">
            <title id="dropdown-arrow-title-${index}">Fermer le menu de tri</title>
            <use xlink:href="#dropdown-arrow" ></use>
          </svg>     
    `;

      if (index === 0) {
        $li.setAttribute("aria-selected", "true");
        $li.classList.add("active");
        $li.innerHTML += $icon;
      } else {
        $li.setAttribute("aria-selected", "false");
      }
      this.$dropdownMenu.appendChild($li);
    });
    return this.$dropdownMenu;
  }

  // call the creation and method of the various element that populate the sorter functionalities
  createSorter(name) {
    const options = [
      {
        value: "-1",
        text: "Aucun Tri",
      },
      {
        value: "likes",
        text: "Popularité",
      },
      {
        value: "date",
        text: "Date",
      },
      {
        value: "title",
        text: "Titre",
      },
    ];

    const $spanLabel = document.createElement("span");
    $spanLabel.id = "listbox-label";
    $spanLabel.textContent = "Trier par:";

    this.$wrapper.classList.add("photograph-controls");
    this.$wrapper.setAttribute("tabindex", "0");
    this.$wrapper.setAttribute("aria-LabelledBy", "photograph-controls__title");

    this.$sorterWrapper.classList.add("sorter-wrapper");

    const $dropdownWrapper = this.createDropdown();
    const $dropdownToggle = this.createdropdownToggle(options[0]);
    const $dropdownMenu = this.createDropdownMenu(options);

    $dropdownWrapper.append($dropdownToggle, $dropdownMenu);
    this.$sorterWrapper.append($spanLabel, $dropdownWrapper);

    const $sectionTitle = this.createControlsSectionTitle(name);

    this.$wrapper.append($sectionTitle, this.$sorterWrapper);

    this.toggleDropdown();
    this.handleKeyboardListNav();
    this.handleClickListNav();
    this.$photographHeader.after(this.$wrapper);
  }

  /**
   * Sort functionalities
   */
  // clear the gallery of media, and using the sorter api, repopuate it with the createCard method of the media object.
  async sorterMedias(value) {
    this.clearMedias();
    if (value == "-1") {
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

  // click listener on the toggle button for the dropdown
  toggleDropdown() {
    const that = this;
    this.$dropdownToggle.addEventListener("click", function (e) {
      const expanded = this.getAttribute("aria-expanded");
      if (expanded == "true") {
        this.setAttribute("aria-expanded", "false");
        this.nextElementSibling.classList.toggle("show");
      } else {
        this.setAttribute("aria-expanded", "true");
        this.nextElementSibling.classList.toggle("show");
        that.$dropdownMenu.firstChild.focus();
      }
    });
  }

  // update the info on the toggle button for the dropdown
  updateToggleDropdown(value, text) {
    this.$dropdownToggle.querySelector(".text-holder").textContent = text;
    this.$dropdownToggle.setAttribute("data-value", value);
  }

  // update the ria attributes of the list on the click.
  updateListSelected(items, itemObj) {
    items.forEach((item) => {
      item.setAttribute("aria-selected", "false");
      item.setAttribute("aria-checked", "false");
    });
    itemObj.setAttribute("aria-selected", "true");
    itemObj.setAttribute("aria-checked", "true");
  }

  // click listeners for the elements of the list items. call the sorter func. and update toggle
  handleClickListNav() {
    const that = this;
    const $dropdownItems =
      that.$dropdownMenu.querySelectorAll(".dropdown-item");
    $dropdownItems.forEach((item) => {
      item.addEventListener("click", function (e) {
        const text = item.querySelector(".text-holder").innerText;
        that.sorterMedias(item.dataset.value);
        that.updateToggleDropdown(item.dataset.value, text);
        that.updateListSelected($dropdownItems, item);
        if (that.$dropdownMenu.classList.contains("show")) {
          that.$dropdownMenu.classList.toggle("show");
        }
      });
    });
  }

  // Listen to the keyboard event. Allow the sorter list navigation by keyboard.
  handleKeyboardListNav() {
    const that = this;
    window.addEventListener(
      "keydown",
      function (e) {
        const expanded = that.$dropdownToggle.getAttribute("aria-expanded");
        const activeEl = document.activeElement;
        if (expanded == "true") {
          if ("ArrowDown" == e.code) {
            e.preventDefault();

            activeEl.nextElementSibling
              ? activeEl.nextElementSibling.focus()
              : "";
          }
          if ("ArrowUp" == e.code) {
            e.preventDefault();
            activeEl.previousElementSibling
              ? activeEl.previousElementSibling.focus()
              : "";
          }
          if ("Escape" == e.code) {
            e.preventDefault();
            that.$dropdownToggle.setAttribute("aria-expanded", "false");
            that.$dropdownMenu.classList.toggle("show");
            that.$dropdownToggle.focus();
          }
          if (e.shiftKey && "Tab" == e.code) {
            if (activeEl == that.$dropdownMenu.firstChild) {
              e.preventDefault();
              that.$dropdownToggle.setAttribute("aria-expanded", "false");
              that.$dropdownMenu.classList.toggle("show");
              that.$dropdownToggle.focus();
            }
          }

          if ("Enter" == e.code) {
            e.preventDefault();
            const textEl = activeEl.querySelector(".text-holder");
            if (textEl) {
              var text = activeEl.querySelector(".text-holder").textContent;
            }
            that.sorterMedias(activeEl.dataset.value);
            that.$dropdownMenu.classList.toggle("show");
            that.$dropdownToggle.setAttribute("aria-expanded", "false");
            that.updateToggleDropdown(activeEl.dataset.value, text);
            that.$dropdownToggle.focus();
          }
        }
      },
      false
    );
  }

  // clear the media gallery
  clearMedias() {
    this.$mediaWrapper.innerHTML = "";
  }
}
