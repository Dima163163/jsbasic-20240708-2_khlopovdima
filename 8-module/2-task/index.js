import createElement from '../../assets/lib/create-element.js';
import ProductCard from '../../6-module/2-task/index.js';

export default class ProductGrid {
  constructor(products) {
    this.products = products;
    this.filters = {};
    this.renderProductGrid(this.products);
  }

  renderProductGrid(products) {
    console.log(products);
    this.elem = createElement(`
      <div class="products-grid">
        <div class="products-grid__inner">
        </div>
      </div>
    `);

    products.forEach(product => {
      const card = new ProductCard(product);
      this.elem.querySelector('.products-grid__inner').append(card.elem);
    });
  }

  updateFilter(filters) {
    Object.assign(this.filters, filters);

    this.productsFilteredAfter = [...this.products];
    if (this.filters.noNuts) {
      this.productsFilteredAfter = [...this.productsFilteredAfter.filter(product => product.nuts === undefined || product.nuts === false)];
    }

    if (this.filters.vegeterianOnly) {
      this.productsFilteredAfter = [...this.productsFilteredAfter.filter(product => product.vegeterian === true)];
    }

    if (this.filters.category) {
      this.productsFilteredAfter = [...this.productsFilteredAfter.filter(product => product.category === this.filters.category)];
    }

    if (this.filters.maxSpiciness) {
      this.productsFilteredAfter = [...this.productsFilteredAfter.filter(product => product.spiciness <= this.filters.maxSpiciness)];
    }

    this.renderProductGrid(this.productsFilteredAfter);
  }
}
