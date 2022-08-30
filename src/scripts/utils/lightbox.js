/**
 *
 * Lightbox
 *
 */

const slides = document.querySelectorAll(".slide");

console.log(slides);

/**
 * Lightbox functionalities
 */
const setActiveSlide = (index) => {
  slides.forEach((slide) => {
    console.log("slide");
    slide.dataset.index === index ? slide.classList.add("active") : "";
  });
};
