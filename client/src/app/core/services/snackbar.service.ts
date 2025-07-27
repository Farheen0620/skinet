import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar'

@Injectable({
  providedIn: 'root'
})
export class SnackbarService { // used to reate soething ore partiular than an alert box for displaying errors
  private snackbar = inject(MatSnackBar);

  error(meassage : string) {
    this.snackbar.open(meassage, 'Close', {
      duration: 5000,
      panelClass: ['snack-error'] // to custoie styling of snak bar
    })
  }

  success(meassage: string) {
    this.snackbar.open(meassage, 'Close', {
      duration: 5000,
      panelClass: ['snack-error'] // to custoie styling of snak bar
    })
  }
}
