import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BusyService {
  loading = false
  busyRequestCounting = 0;

  busy(){
    this.busyRequestCounting++;
    this.loading = true;
  }

  idle(){
    this.busyRequestCounting--;
    if (this.busyRequestCounting <= 0){
      this.busyRequestCounting = 0;
      this.loading = false;
    }
  }
  
}
