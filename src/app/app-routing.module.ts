import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { LandingComponent } from './views/landing/landing.component';
import { WeatherForecastComponent } from './views/weather-forecast/weather-forecast.component';
import { NotFoundComponent } from './views/not-found/not-found.component';
import { TodoListComponent } from './views/todo-list/todo-list.component';

//Dichiarazione delle rotte dell'applicazione
//I moduli WeatherReportsModule e ExperimentsModule saranno caricati in modalità lazy loading
const routes: Routes = [
  {
    path: "",
    //canActivateChild: [/* Guard */],
    children: [
      {
        path: "",
        redirectTo: "/welcome",
        pathMatch: "full"
      },
      {
        path: "welcome",
        component: LandingComponent
      },
      {
        path: "home",
        component: HomeComponent
      },
      {
        path: "forecast",
        component: WeatherForecastComponent
      },
      {
        path: "todo",
        component: TodoListComponent
      },
      {
        path: "forecast-charts",
        loadChildren: () => import("./modules/weather-reports/weather-reports.module").then(m=>m.WeatherReportsModule)
      },
      {
        path: "area-51",
        loadChildren: () => import("./modules/experiments/experiments.module").then(m=>m.ExperimentsModule)
      },
      {
        path: "**",
        component: NotFoundComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
