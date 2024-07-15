function initCarousel() {
  const btnRight = document.querySelector(".carousel__arrow_right");
  const btnLeft = document.querySelector(".carousel__arrow_left");
  const carouselInner = document.querySelector(".carousel__inner");
  const carouselSlides = document.querySelectorAll('.carousel__slide');

  let width = carouselSlides[0].offsetWidth;

  let sumWidthSlide = 0;
  let conunt = 0;

  function showButton () {
    if (conunt === carouselSlides.length - 1) {
      btnRight.style.display = 'none';
      btnLeft.style.display = '';
    }

    if (conunt < carouselSlides.length - 1) {
      btnRight.style.display = '';
      btnLeft.style.display = '';
    }

    if (conunt === 0) {
      btnRight.style.display = '';
      btnLeft.style.display = 'none';
    }
  }

  function slideRight() {
    if (conunt < carouselSlides.length - 1) {
      sumWidthSlide -= width;
      carouselInner.style.transform = `translateX(${sumWidthSlide}px)`;
      conunt++;
    }

    showButton();
  }

  function slideLeft() {
    if (conunt > 0) {
      sumWidthSlide += width;
      carouselInner.style.transform = `translateX(${sumWidthSlide}px)`;
      conunt--;
    }

    showButton();
  }

  showButton();
  btnRight.addEventListener('click', slideRight);
  btnLeft.addEventListener('click', slideLeft);
}
