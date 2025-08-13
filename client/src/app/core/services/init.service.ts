import { inject, Injectable } from '@angular/core';
import { CartService } from './cart.service';
import { forkJoin, of } from 'rxjs';
import { AccountService } from './account.service';

@Injectable({
  providedIn: 'root'
})
export class InitService {
  //used to persist cart and app initialier work with the obserable fro this app initialier doesn't work
  //  with signal

  private cartService = inject(CartService);
  private accountService = inject(AccountService);// to persist our logged in user even after
  //refreshig the page

  init() { //to load cart before loading app
    const cartId = localStorage.getItem('cart_id');
    const cart$ = cartId ? this.cartService.getCart(cartId) : of(null) //will wait for the obsrable(cart) 
    //while we are initializing our app

    return forkJoin({// ] fork join is used to combine the result of multiple http rqst and wait until all of
      //them are ready to load
      cart: cart$,
      user: this.accountService.getUserInfo()
    })
  }
}
