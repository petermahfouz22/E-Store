import { Component } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, CurrencyPipe],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  constructor(public cartService: CartService) {}

  increaseQuantity(item: any): void {
    this.cartService.updateQuantity(item.id, item.quantity + 1);
  }

  decreaseQuantity(item: any): void {
    this.cartService.updateQuantity(item.id, item.quantity - 1);
  }

  getSubtotal(): number {
    return this.cartService.getCartItems().reduce(
      (total: number, item: any) => total + (item.price * item.quantity), 0
    );
  }

  getTotal(): number {
    return this.getSubtotal();
  }
}
