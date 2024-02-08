import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  spinner: boolean = false;
  botonActivo: boolean = false;
  constructor() { }

  showSpinner() {
    this.spinner = true;
  }

  hiddenSpinner() {
    this.spinner = false;
  }
}
