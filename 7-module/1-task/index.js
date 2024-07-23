import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {
  constructor(categories) {
    this.categories = categories;
    this.renderRibbonMenu();
    this.ribbonInner = this.elem.querySelector('.ribbon__inner');
    this.ribbonItems = this.elem.querySelectorAll('.ribbon__item');
    this.btnRight = this.elem.querySelector('.ribbon__arrow_right');
    this.btnLeft = this.elem.querySelector('.ribbon__arrow_left');
    this.scrollRightRibbonMenu();
    this.scrollLeftRibbonMenu();
    this.visibleButton();
    this.changeCategory();
  }

  renderRibbonMenu() {
    this.elem = createElement(`
      <div class="ribbon">
        <!--Кнопка прокрутки влево-->
        <button class="ribbon__arrow ribbon__arrow_left ribbon__arrow_visible">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </button>

        <!--Ссылки на категории-->
        <nav class="ribbon__inner">
        </nav>

        <!--Кнопка прокрутки вправо-->
        <button class="ribbon__arrow ribbon__arrow_right">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </button>
      </div>
    `);


    this.categories.forEach((catagory, index)=> {
      const ribbonItem = createElement(`
        <a href="#" class="ribbon__item${index === 0 ? " ribbon__item_active" : ""}" data-id="${catagory.id}">${catagory.name}</a>
      `);

      const ribbonInner = this.elem.querySelector('.ribbon__inner');

      ribbonInner.append(ribbonItem);
    });
  }

  visibleButton() {
    const scrollWidth = this.ribbonInner.scrollWidth;
    const scrollLeft = this.ribbonInner.scrollLeft;
    const clientWidth = this.ribbonInner.clientWidth;
    const scrollRight = scrollWidth - scrollLeft - clientWidth;

    if (scrollLeft === 0) {
      this.btnLeft.classList.remove('ribbon__arrow_visible');
      this.btnRight.classList.add('ribbon__arrow_visible');
    } else if (scrollRight < 1) {
      this.btnRight.classList.remove('ribbon__arrow_visible');
      this.btnLeft.classList.add('ribbon__arrow_visible');
    } else {
      this.btnLeft.classList.add('ribbon__arrow_visible');
      this.btnRight.classList.add('ribbon__arrow_visible');
    }
  }

  scrollRightRibbonMenu() {
    this.btnLeft.addEventListener('click', () => {
      this.ribbonInner.scrollBy(-350, 0);
    });

    this.ribbonInner.addEventListener('scroll', () => {
      this.visibleButton();
    });
  }

  scrollLeftRibbonMenu() {
    this.btnRight.addEventListener('click', () => {
      this.ribbonInner.scrollBy(350, 0);
    });

    this.ribbonInner.addEventListener('scroll', () => {
      this.visibleButton();
    });
  }

  changeCategory() {
    this.ribbonInner.addEventListener('click', (e) => {
      e.preventDefault();

      if (e.target.matches('.ribbon__item')) {
        this.ribbonItems.forEach(ribbonItem => {
          ribbonItem.classList.remove('ribbon__item_active');
        });
        e.target.classList.add('ribbon__item_active');

        const category = e.target.dataset;
        const event = new CustomEvent('ribbon-select', {
          detail: category.id,
          bubbles: true,
        });
        this.ribbonInner.dispatchEvent(event);
      }
    });
  }
}
