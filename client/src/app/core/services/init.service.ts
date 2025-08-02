import { inject, Injectable } from '@angular/core';
import { CartService } from './cart.service';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InitService {
  //used to persist cart and app initialier work with the obserable fro this app initialier doesn't work
  //  with signal

  private cartService = inject(CartService);

  init() { //to load cart before loading app
    const cartId = localStorage.getItem('cart_id');
    const cart$ = cartId ? this.cartService.getCart(cartId) : of(null) //will wait for the obsrable(cart) 
    //while we are initializing our app

    return cart$;
  }
}
