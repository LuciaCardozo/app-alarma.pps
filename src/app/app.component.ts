import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from './services/shared/shared.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  splash: boolean = true;
  constructor(private route:Router, public spinnerService: SharedService) {
    if(this.splash){
      setTimeout(()=>{
        this.route.navigate(['/login'])
        this.splash = false;
      },5000)
    } 
  }
}
