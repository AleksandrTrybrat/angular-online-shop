import { Component } from '@angular/core';
import { Product } from '../shared/product.model';
import { ProductService } from '../product.service';
import { PaginationInstance } from 'ngx-pagination';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  products: Product[] = [];
  paginatedProducts: Product[] = [];
  selectedCurrencySymbol: string = '$';
  filterText: string = '';
  config: PaginationInstance = {
    itemsPerPage: 15,
    currentPage: 1,
  };

  constructor(private productService: ProductService) {
    this.products = this.productService.getProducts();
  }

  filterProducts() {
    this.config.currentPage = 1;
  }

  get filteredProducts(): Product[] {
    return this.products.filter(product =>
      product.name.toLowerCase().replace(/\s/g, '').includes(this.filterText.toLowerCase().replace(/\s/g, ''))
    );
  }
}
