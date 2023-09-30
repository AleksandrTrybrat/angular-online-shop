import { Component } from '@angular/core';
import { CartService } from '../cart.service';
import { Product } from '../shared/product.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {

  cartItems: Product[] = [];
  selectedCurrencySymbol: string = '$';
  totalOrderPrice: number = 0;
  cartItemCount: number = 0;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartItems = this.cartService.getCartItemsFromLocalStorage();
    this.calculateTotalOrderPrice();
    this.cartItemCount = this.cartService.getCartItemCount();
  }

  removeFromCart(product: Product) {
    this.cartService.removeItemFromCart(product);
    this.cartItemCount = this.cartService.getCartItemCount();
    this.calculateTotalOrderPrice();
    this.cartItems = this.cartService.getCartItems();
  }

  checkout() {
    this.cartService.clearCart();
    this.cartItems = [];
    this.calculateTotalOrderPrice();
    this.cartService.clearCartLocalStorage();
    this.cartItemCount = 0;
    this.cartService.updateCartItemCount();
  }

  calculateItemTotal(item: Product): number {
    return item.price * item.quantity;
  }

  calculateTotalOrderPrice() {
    this.totalOrderPrice = this.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  }

  incrementQuantity(product: Product) {
    product.quantity += 1;
    this.calculateTotalOrderPrice();
    this.cartService.updateCartItemCount();
  }

  decrementQuantity(product: Product) {
    if (product.quantity > 1) {
      product.quantity -= 1;
    } else {
      this.removeFromCart(product);
    }
    this.calculateTotalOrderPrice();
    this.cartService.updateCartItemCount();
  }

  formatTotalPrice(price: number, currencySymbol: string): string {
    return price.toFixed(2) + ' ' + currencySymbol;
  }
}
