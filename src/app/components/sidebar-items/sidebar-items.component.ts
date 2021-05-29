import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { SidebarItem } from 'src/app/modules/shared/models/types';

@Component({
  selector: 'app-sidebar-items',
  templateUrl: './sidebar-items.component.html',
  styleUrls: ['./sidebar-items.component.scss']
})
export class SidebarItemsComponent implements OnInit {
  @Output() navigated = new EventEmitter<boolean>();


  sidebarItems: SidebarItem[] = [
    {
      title: "Home",
      path: "/home",
      icon: "home"
    },
    {
      title: "Weather Forecast",
      path: "/forecast",
      icon: "light_mode"
    },
    {
      title: "Todo List",
      path: "/todo",
      icon: "checklist"
    },
    {
      title: "Weather Reports",
      path: "/forecast-charts",
      icon: "insights"
    },
    {
      title: "Experimental Area",
      path: "/area-51",
      icon: "science"
    }
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
