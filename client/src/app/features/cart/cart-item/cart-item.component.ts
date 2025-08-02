import { Component, inject, input } from '@angular/core';
import { CartItem } from '../../../shared/models/cart';
import { RouterLink } from '@angular/router';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { CurrencyPipe } from '@angular/common';
import { CartService } from '../../../core/services/cart.service';

@Component({
  selector: 'app-cart-item',
  imports: [
    RouterLink,
    MatButton,
    MatIcon,
    CurrencyPipe
  ],
  templateUrl: './cart-item.component.html',
  styleUrl: './cart-item.component.scss'
})
export class CartItemComponent {
  item = input.required<CartItem>();//take mandatory input of item of type cart
  cartService = inject(CartService);

  incrementQuantity(){ //describe functionality of + button near the qty of product in cart
    this.cartService.addItemToCart(this.item());
  }

  decrementQuantity(){//describe functionality of - button near the qty of product in cart
    this.cartService.removeItemFromCart(this.item().productId);
  }

  removeItemFromCart(){ //describe functionality of delete button near the product in cart
    this.cartService.removeItemFromCart(this.item().productId, this.item().quantity);
  }
}
