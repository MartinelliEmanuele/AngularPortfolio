import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SidebarItem } from './modules/shared/models/types';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  sidebarItems: SidebarItem[] = [
    {
      title: "Home",
      path: "/home",
      icon: "home"
    },
    {
      title: "Home",
      path: "/welcome",
      icon: "welcome"
    },
    {
      title: "Home",
      path: "/home",
      icon: "home"
    },
    {
      title: "Home",
      path: "/home",
      icon: "home"
    }
  ]
  
  constructor(private router: Router){

  }

  isFullPage(): boolean {
    return this.router.url.includes("welcome");
  }
}
