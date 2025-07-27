import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { SnackbarService } from '../services/snackbar.service';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);// as it is a fn not a class we need to delare properties as var 
  // using let orconst
  const snackbar = inject(SnackbarService);

  return next(req).pipe(//gie the result bak to the requested ontainer in angular
  //errors are got after rqst goes bak fro API so it should be gien below this stateent,anything
  //that has to be done b4 sending rqst to API should be done aboe this stateent
  catchError((err:HttpErrorResponse) => {
    if(err.status===400){
      if(err.error.errors){
        const modelStateErrors = [];
        for(const key in err.error.errors){
          if(err.error.errors[key]){
            modelStateErrors.push(err.error.errors[key])
          }
        }
        throw modelStateErrors.flat();
      }else{
      snackbar.error(err.error.title || err.error)
      }
    }

    if(err.status===401){
      snackbar.error(err.error.title || err.error)
    }

    if(err.status===404){
      router.navigateByUrl('/not-found')
    }

    if(err.status===500){
      const navigationExtras: NavigationExtras = {state: {error:err.error}}
      router.navigateByUrl('/server-error',navigationExtras)
    }
    return throwError(() => err)
  })
)

};
