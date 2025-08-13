import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  //used to simplify the use of withCredetials:true in every http rqst in account.service.ts
  const clonedRequest = req.clone({//we are creating this cloned rqst coz req is immutable so we have to 
  // clone it
    withCredentials: true
  })
  return next(clonedRequest);
};
