import createElement from '../../assets/lib/create-element.js';
import ProductCard from '../../6-module/2-task/index.js';

export default class ProductGrid {
  constructor(products) {
    this.products = products;
    this.filters = {};
    this.renderProductGrid();
  }

  renderProductGrid() {
    this.elem = createElement(`
      <div class="products-grid">
        <div class="products-grid__inner">
        </div>
      </div>
    `);

    this.products.forEach(product => {
      const card = new ProductCard(product);
      this.elem.querySelector('.products-grid__inner').append(card.elem);
    });
  }

  updateFilter(filters) {
    Object.assign(this.filters, filters);

    this.products = this.products.filter((product) => {
      if (this.filters.noNuts) {
        return product.nuts !== this.filters.noNuts;
      }
      
      if (this.filters.vegeterianOnly) {
        return product.vegeterian === this.filters.vegeterianOnly;
      }

      if (this.filters.category) {
        return product.category === this.filters.category;
      }

      if (this.filters.maxSpiciness) {
        return product.spiciness <= this.filters.maxSpiciness;
      }

      return product;
    });

    this.renderProductGrid();
  }
}
