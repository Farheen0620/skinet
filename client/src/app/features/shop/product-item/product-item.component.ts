import { Component, Input } from '@angular/core';
import { Product } from '../../../shared/models/Product';
import { MatCard, MatCardActions, MatCardContent } from '@angular/material/card';
import { f } from "../../../../../node_modules/@angular/material/icon-module.d-COXCrhrh";
import { MatIcon } from '@angular/material/icon';
import { CurrencyPipe } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-product-item',
  imports: [
    MatCard,
    MatCardContent,
    MatCardActions,
    MatIcon,
    CurrencyPipe,
    MatButton,
    RouterLink 
],
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.scss'
})
export class ProductItemComponent {
  @Input() product? : Product;
}
