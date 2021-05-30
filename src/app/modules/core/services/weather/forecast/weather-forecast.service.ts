import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WeatherForecast } from 'src/app/modules/shared/models/types';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WeatherForecastService {

  constructor(private http: HttpClient) { }

  getBaseUrl(query?: string) {
    return `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${environment.weatherApiKey}&units=metric`
  }

  getWeatherForcast(city?:string): Observable<WeatherForecast>{
    return this.http.get<WeatherForecast>(this.getBaseUrl(city));
  }
}
