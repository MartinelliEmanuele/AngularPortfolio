import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExperimentsRoutingModule } from './experiments-routing.module';
import { PlaygroundComponent } from './views/playground/playground.component';


@NgModule({
  declarations: [
    PlaygroundComponent
  ],
  imports: [
    CommonModule,
    ExperimentsRoutingModule
  ]
})
export class ExperimentsModule { }
