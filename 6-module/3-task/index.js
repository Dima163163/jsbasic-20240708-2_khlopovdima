import createElement from '../../assets/lib/create-element.js';

export default class Carousel {
  constructor(slides) {
    this.slides = slides;
    this.renderCarousel();
    this.changeSlide();
    this.productAdd();
  }

  renderCarousel() {
    this.elem = createElement(`
      <div class="carousel">
        <!--Кнопки переключения-->
        <div class="carousel__arrow carousel__arrow_right">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </div>
        <div class="carousel__arrow carousel__arrow_left">
          <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
        </div>
      </div>
    `);

    const carouselInner = document.createElement('div');
    carouselInner.className = 'carousel__inner';

    this.slides.forEach(slide => {
      const carouselSlide = createElement(`
        <div class="carousel__slide" data-id="${slide.id}">
          <img src="/assets/images/carousel/${slide.image}" class="carousel__img" alt="slide">
          <div class="carousel__caption">
            <span class="carousel__price">€${slide.price.toFixed(2)}</span>
            <div class="carousel__title">${slide.name}</div>
            <button type="button" class="carousel__button">
              <img src="/assets/images/icons/plus-icon.svg" alt="icon">
            </button>
          </div>
        </div>
      `);

      carouselInner.append(carouselSlide);
    });

    this.elem.append(carouselInner);
  }

  changeSlide() {
    const carousel = this.elem;
    const btnRight = carousel.querySelector('.carousel__arrow_right');
    const btnLeft = carousel.querySelector('.carousel__arrow_left');
    const carouselInner = carousel.querySelector('.carousel__inner');
    const carouselSlides = carousel.querySelectorAll('.carousel__slide');
    let width;

    let sumWidthSlide = 0;
    let conunt = 0;


    function showButton() {
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
      width = carouselSlides[0].offsetWidth;

      if (conunt < carouselSlides.length - 1) {
        sumWidthSlide -= width;
        carouselInner.style.transform = `translateX(${sumWidthSlide}px)`;
        conunt++;
      }

      showButton();
    }

    function slideLeft() {
      width = carouselSlides[0].offsetWidth;

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

  productAdd() {
    const addBtns = this.elem.querySelectorAll('.carousel__button');

    addBtns.forEach(addBtn => {
      addBtn.addEventListener('click', function (e) {
        const idProduct = e.target.closest('.carousel__slide').dataset.id;
        const event = new CustomEvent('product-add', {
          detail: idProduct,
          bubbles: true
        });
        addBtn.dispatchEvent(event);
      });
    });
  }
}
