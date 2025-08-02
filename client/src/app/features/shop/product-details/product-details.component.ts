import { Component, inject, OnInit } from '@angular/core';
import { ShopService } from '../../../core/services/shop.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../../shared/models/Product';
import { CurrencyPipe } from '@angular/common';
import { f } from "../../../../../node_modules/@angular/material/icon-module.d-COXCrhrh";
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatFormField, MatLabel } from '@angular/material/form-field'
import { MatDivider } from '@angular/material/divider';
import { MatInput } from '@angular/material/input'
import { CartService } from '../../../core/services/cart.service';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-product-details',
  imports: [
    CurrencyPipe,
    MatButton,
    MatIcon,
    MatFormField,
    MatLabel,
    MatDivider,
    MatInput,
    FormsModule
],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent implements OnInit{
  private shopService = inject(ShopService);
  private activatedRoute = inject(ActivatedRoute);
  private cartService = inject(CartService);
  product?: Product;
  quantityInCart = 0;//setion 13
  quantity = 1;

  ngOnInit(): void {
    this.loadProduct();
  }

  loadProduct(){
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if(!id) return;
    this.shopService.getProduct(+id).subscribe({
      next: product => {
        this.product = product,
        this.updateQuantityInCart() //setion 13
      },
      error: error => console.log(error)
    })
  }

  updateCart() { // funtionality for updating cart using add to cart button in product details page
    if(!this.product) return;
    if(this.quantity > this.quantityInCart){ //add quantity of a produt that is not already added in cart
      const itemsToAdd = this.quantity - this.quantityInCart;
      this.quantityInCart += itemsToAdd;
      this.cartService.addItemToCart(this.product, itemsToAdd);
    } else {//decreasing quantity
      const itemsToRemove = this.quantityInCart - this.quantity;
      this.quantityInCart -= itemsToRemove;
      this.cartService.removeItemFromCart(this.product.id, itemsToRemove);
    }
  }

  updateQuantityInCart(){//setion 13
    this.quantityInCart = this.cartService.cart()?.items
      .find(x => x.productId === this.product?.id)?.quantity || 0;
    this.quantity = this.quantityInCart || 1;
  }

  getButtonText(){
    return this.quantityInCart > 0 ? 'Update cart' : 'Add to cart' //till this
  }
}
