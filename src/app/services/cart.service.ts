import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems = new BehaviorSubject<any[]>([]);
  cartItems$ = this.cartItems.asObservable();


  addToCart(product: any, quantity: number = 1): void {
    const currentItems = this.cartItems.getValue();
    const existingItem = currentItems.find(item => item.id === product.id);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      currentItems.push({
        ...product,
        quantity: quantity
      });
    }

    this.cartItems.next([...currentItems]);
  }


  updateQuantity(productId: number, newQuantity: number): void {
    const currentItems = this.cartItems.getValue();
    const itemIndex = currentItems.findIndex(item => item.id === productId);

    if (itemIndex > -1) {
      if (newQuantity > 0) {
        currentItems[itemIndex].quantity = newQuantity;
      } else {
        currentItems.splice(itemIndex, 1);
      }
      this.cartItems.next([...currentItems]);
    }
  }


  removeFromCart(productId: number): void {
    const currentItems = this.cartItems.getValue();
    this.cartItems.next(currentItems.filter(item => item.id !== productId));
  }


  getCartItems(): any[] {
    return this.cartItems.getValue();
  }


  getTotalItems(): number {
    return this.cartItems.getValue().reduce((total, item) => total + item.quantity, 0);
  }
}
