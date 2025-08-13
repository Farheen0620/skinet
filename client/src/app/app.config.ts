import { APP_INITIALIZER, ApplicationConfig, inject, provideAppInitializer, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { errorInterceptor } from './core/interceptor/error-interceptor';
import { loadingInterceptor } from './core/interceptor/loading-interceptor';
import { InitService } from './core/services/init.service';
import { lastValueFrom } from 'rxjs';
import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { authInterceptor } from './core/interceptor/auth-interceptor';



export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient(withInterceptors([
      errorInterceptor, 
      loadingInterceptor,
      authInterceptor 
    ])),
    provideAppInitializer( async () => { //section 13 used to load cart data before loading app
      const initService = inject(InitService);
      return lastValueFrom(initService.init()).finally(() => { // take lastupdated data from cart finally() is 
        //executed even if the cart loading is a success or failure no matter what
        const splash = document.getElementById('initial_splash'); //shows a the icon of the app as a splash image 
        //in app
        if(splash){
          splash.remove(); //remove that image after loading of app goto index.html and init service next
        }
      })
    }),
    {
      provide: MAT_DIALOG_DEFAULT_OPTIONS,
      useValue: { autoFocus:'dialog', restoreFocus: true }
    } //till here

  ]
};
