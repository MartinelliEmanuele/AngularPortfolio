import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WeatherReportsRoutingModule } from './weather-reports-routing.module';
import { ReportsComponent } from './views/reports/reports.component';


@NgModule({
  declarations: [
    ReportsComponent
  ],
  imports: [
    CommonModule,
    WeatherReportsRoutingModule
  ]
})
export class WeatherReportsModule { }
