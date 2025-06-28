import { Component } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductService } from '../services/product.service';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, RouterModule, CurrencyPipe],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  products: any[] = [];
  cartItems: any[] = [];

  constructor(
    private productService: ProductService,
    private cartService: CartService
  ) {
    this.cartService.cartItems$.subscribe(items => {
      this.cartItems = items;
    });
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe({
      next: (response) => {
        this.products = response.products;
      },
      error: (error) => {
        console.error('Error:', error);
        this.products = []; 
      }
    });
  }

  getProductQuantity(productId: number): number {
    const item = this.cartItems.find(i => i.id === productId);
    return item ? item.quantity : 0;
  }

  increaseQuantity(product: any): void {
    const currentQuantity = this.getProductQuantity(product.id);
    this.cartService.updateQuantity(product.id, currentQuantity + 1);
  }

  decreaseQuantity(product: any): void {
    const currentQuantity = this.getProductQuantity(product.id);
    if (currentQuantity > 0) {
      this.cartService.updateQuantity(product.id, currentQuantity - 1);
    }
  }

  addToCart(product: any): void {
    const currentQuantity = this.getProductQuantity(product.id);
    this.cartService.addToCart(product, currentQuantity > 0 ? 1 : 1);
  }
}