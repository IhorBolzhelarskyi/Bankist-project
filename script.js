"use strict";

///////////////////////////////////////
// Modal window

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");
const btnScrollTo = document.querySelector(`.btn--scroll-to`);
const section1 = document.querySelector(`#section--1`);
const tabs = document.querySelectorAll(`.operations__tab`);
const tabsContainer = document.querySelector(`.operations__tab-container`);
const tabsContent = document.querySelectorAll(`.operations__content`);
const nav = document.querySelector(`.nav`);
const header = document.querySelector(`.header`);
const sections = document.querySelectorAll(`.section`);

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

btnsOpenModal.forEach((btn) => {
  btn.addEventListener(`click`, openModal);
});

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

btnScrollTo.addEventListener(`click`, (e) => {
  // const s1coords = section1.getBoundingClientRect();
  // window.scrollTo({
  //   left: s1coords.left + window.pageXOffset,
  //   top: s1coords.top + window.pageYOffset,
  //   behavior: `smooth`,
  // });
  section1.scrollIntoView({ behavior: `smooth` }); // same like 38-43 lines of code
});

// Page navigator

// document.querySelectorAll(`.nav__link`).forEach((element) => {
//   element.addEventListener(`click`, (e) => {
//     e.preventDefault();
//     const id = element.getAttribute(`href`);
//     console.log(id);
//     document.querySelector(id).scrollIntoView({ behavior: `smooth` });
//   });
// });

// Event delegation
// 1. Add event listener to common parent element
// 2. Determine what element originated the event

document.querySelector(`.nav__links`).addEventListener(`click`, function (e) {
  e.preventDefault();
  if (e.target.classList.contains(`nav__link`)) {
    const id = e.target.getAttribute(`href`);
    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  }
});

// Tabbed component

tabsContainer.addEventListener(`click`, (e) => {
  const clicked = e.target.closest(`.operations__tab`);
  console.log(e.target.closest(`.operations__tab`));

  // Guard clause
  if (!clicked) return;
  // Remove active classes
  tabs.forEach((tab) => tab.classList.remove(`operations__tab--active`));

  tabsContent.forEach((content) => content.classList.remove(`operations__content--active`));
  // Activate tab
  clicked.classList.add(`operations__tab--active`);
  //Activate content area
  document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add(`operations__content--active`);
});
// Menu fade animation
function handleHover(e, opacity, scale) {
  if (e.target.classList.contains(`nav__link`)) {
    const link = e.target;
    const siblings = link.closest(`.nav__links`).querySelectorAll(`.nav__link`);
    const logo = link.closest(`.nav`).querySelector(`#logo`);
    siblings.forEach((element) => {
      if (element !== link) {
        element.style.opacity = this[0];
        element.style.transform = `scale(1)`;
      } else {
        element.style.transform = `scale(${this[1]})`;
      }
    });
    logo.style.opacity = this[0];
    logo.style.transform = `scale(${this[1]})`;
  }
}
nav.addEventListener(`mouseover`, handleHover.bind([0.5, 1.1]));
nav.addEventListener(`mouseout`, handleHover.bind([1, 1]));

// Add sticky nav

const navHeight = nav.getBoundingClientRect().height;

function stickyNav(entries) {
  if (!entries[0].isIntersecting) {
    nav.classList.add(`sticky`);
  } else {
    nav.classList.remove(`sticky`);
  }
}

const headerObserve = new IntersectionObserver(stickyNav, { root: null, threshold: 0, rootMargin: `-${navHeight}px` });

headerObserve.observe(header);

// Reveal sections

function revealSections(entries, observer) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.remove(`section--hidden`);
      observer.unobserve(entry.target);
    }
  });
}

const sectionObserver = new IntersectionObserver(revealSections, { root: null, threshold: 0.15 });

sections.forEach((section) => {
  sectionObserver.observe(section);
});

// Lazy loading imgs

const imgTarget = document.querySelectorAll(`img[data-src]`);
console.log(imgTarget);

function revealImgs(entries, observer) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.src = entry.target.dataset.src;
      entry.target.addEventListener(`load`, () => {
        entry.target.classList.remove(`lazy-img`);
      });
      observer.unobserve(entry.target);
    }
  });
}

const imgObserver = new IntersectionObserver(revealImgs, { root: null, threshold: 0, rootMargin: `200px` });

imgTarget.forEach((img) => {
  imgObserver.observe(img);
});

//slider // IMG KARUSEL!!! <------------------------------------------
const slider = () => {
  const slides = document.querySelectorAll(`.slide`);
  const slider = document.querySelector(`.slider`);
  const slideRightBtn = document.querySelector(`.slider__btn--right`);
  const slideLeftBtn = document.querySelector(`.slider__btn--left`);
  const dotsContainer = document.querySelector(`.dots`);
  // create dots for each slide
  slides.forEach((slide, i) => {
    dotsContainer.insertAdjacentHTML(`beforeend`, `<button class = "dots__dot" data-slide="${i}"></button>`);
  });

  let curSlide = 0;
  const maxSlide = slides.length; //  maxSlide -1 amount of imgs

  //functions
  function goToSlide(s) {
    slides.forEach((slide, i) => {
      slide.style.transform = `translateX(${100 * (i - s)}%)`; //0 видимое изображение все остальное скрыто
    });
  }
  // Next slide
  const nextSlide = () => {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }
    goToSlide(curSlide);
    activateDots(curSlide);
  };

  // Previous slide
  const prevSlide = () => {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }
    goToSlide(curSlide);
    activateDots(curSlide);
  };

  const init = () => {
    activateDots(0);
    goToSlide(0);
  };
  init();
  // Events
  slideRightBtn.addEventListener(`click`, nextSlide);
  slideLeftBtn.addEventListener(`click`, prevSlide);
  // keydown left-right slide show
  document.addEventListener(`keydown`, (e) => {
    switch (e.key) {
      case "ArrowRight":
        nextSlide();
        break;
      case "ArrowLeft":
        prevSlide();
        break;
    }
  });

  // switching slide by click on the dot
  dotsContainer.addEventListener(`click`, (e) => {
    console.log(e.target);
    if (e.target.classList.contains(`dots__dot`)) {
      const id = Number(e.target.dataset.slide);
      goToSlide(id);
      activateDots(id);
    }
  });
  // make active dot for active slide
  function activateDots(slide) {
    const buttons = document.querySelectorAll(`.dots__dot`);
    buttons.forEach((dot) => {
      dot.classList.remove(`dots__dot--active`);
    });
    document.querySelector(`.dots__dot[data-slide="${slide}"]`).classList.add(`dots__dot--active`);
  }
};
slider();
