import { Component, OnInit } from '@angular/core';
import { HomeCard } from 'src/app/modules/shared/models/types';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  cards: HomeCard[] = [
    {
      icon: 'light_mode',
      title: 'Weather Forecast',
      description: 'Should I take the umbrella?',
      path: '/forecast',
    },
    {
      icon: 'checklist',
      title: 'Todo List',
      description: 'Todo List with backend interaction (.NET Core 3.1 REST API)',
      path: '/todo',
    },
    {
      icon: 'insights',
      title: 'Weather Reports',
      description: 'Weather forecast, with charts!',
      path: '/forecast-charts',
    },
    {
      icon: 'science',
      title: 'Experimental Area',
      description: 'Danger zone, element inside here may not be completely reliable',
      path: '/area-51',
    }
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
