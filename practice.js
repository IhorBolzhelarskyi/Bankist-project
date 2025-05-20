// console.log(document.documentElement);
// console.log(document.head);
// console.log(document.body);

const allBtns = document.getElementsByTagName(`button`);

const message = document.createElement(`div`);
message.classList.add(`cookie-message`);
message.innerHTML = `We use cookies for improved functionality and analytics. <button class="btn btn--close-cookie">Got it!</button>`;
document.querySelector(`.header`).prepend(message);
document.querySelector(`.btn--close-cookie`).addEventListener(`click`, () => {
  message.remove();
});

message.style.backgroundColor = `#37383d`;
message.width = `120%`;

message.style.height = Number.parseFloat(getComputedStyle(message).height) + 20 + `px`;

const link = document.querySelector(`.nav__logo`);
link.dataset.id = `12`;

// const h1element = document.querySelector(`h1`);
// const myFunction = () => {
//   console.log(`YOOOOO `);
// };
// const randomTnt = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);
// console.log(randomTnt(4, 10));
// h1element.addEventListener(`mouseleave`, myFunction);

// // rgb(69, 62, 62);
// const randomColor = () => `rgb(${randomTnt(0, 255)},${randomTnt(0, 255)},${randomTnt(0, 255)})`;
// console.log(randomColor());

// document.querySelector(`.nav__link`).addEventListener(`click`, function (e) {
//   this.style.backgroundColor = randomColor();
//   console.log(1);
// });
// document.querySelector(`.nav__links`).addEventListener(`click`, function (e) {
//   console.log(`hi!!!`);
//   this.style.backgroundColor = randomColor();
// });

// document.addEventListener(`keyup`, function (e) {
//   console.log(112211313231132);
// });

// const h1 = document.querySelector(`h1`);
// h1.closest(`.header__title`).style.backgroundColor = `#2321`;

// console.log(h1.nextElementSibling);
// const arr = Array.from(h1.parentElement.children);
// console.log(arr);
// arr.forEach((e) => (e !== h1 ? (e.style.backgroundColor = `red`) : (e.style.backgroundColor = `green`)));

const obsCallback = function (entries, observer) {
  entries.forEach((entry) => {});
};

const options = {
  root: null,
  threshold: [0, 0.2],
};

const observer = new IntersectionObserver(obsCallback, options);

observer.observe(document.querySelector(`#section--1`));
