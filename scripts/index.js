import './wrapper.js';

/* //выбор элементов
const cards = document.querySelector(".participants__cards");
const buttonPrev = document.querySelector(".participants__slider-btn_prev");
const buttonNext = document.querySelector(".participants__slider-btn_next");
const arrowBtns = document.querySelectorAll(".participants__slider-btn");
//начальная позиция
let offset = 0;

// скролл мышкой
const dragging = (e) => {
  cards.scrollLeft = e.pageX;
};

cards.addEventListener("mousemove", dragging);

/* buttonPrev.addEventListener('click', function () {
  offset = offset - 1222;
  if (offset < 0) {
    offset = 768;
  }
  cards.style.left = -offset + "px";
});

buttonNext.addEventListener('click', function () {
  offset = offset + 1222;
  if (offset > 768) {
    offset = 0;
  }
  cards.style.left = -offset + "px";
}); 

arrowBtns.forEach(btn => {
  btn.addEventListener("click", () => {
      carousel.scrollLeft += btn.id == "left" ? -firstCardWidth : firstCardWidth;
  });
}); */