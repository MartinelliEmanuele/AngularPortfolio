import { Component, OnInit } from '@angular/core';
import { City, WeatherForecast } from 'src/app/modules/shared/models/types';
import { WeatherForecastService } from '../../modules/core/services/weather/forecast/weather-forecast.service';
import { UtilsService } from '../../modules/core/services/utils.service';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import * as moment from 'moment';


@Component({
  selector: 'app-weather-forecast',
  templateUrl: './weather-forecast.component.html',
  styleUrls: ['./weather-forecast.component.scss']
})
export class WeatherForecastComponent implements OnInit {
  forecast?: WeatherForecast;
  cities: City[] = [];
  filteredCities: Observable<City[]>;
  lastCity: string = "";
  isCalling: boolean = false;
  callMoment: string = "";
  cityFormControl = new FormControl();


  constructor(private weatherForecastService: WeatherForecastService, private utils: UtilsService) { 
    //Inizializza l'array delle città da visualizzare nell'autocomplete
    this.filteredCities = this.cityFormControl.valueChanges
    .pipe(
      startWith(''),
      map(city => city ? this._filterCities(city) : this.cities.slice())
    );
  }

  ngOnInit(): void {
    this.utils.getCitiesFromJson().subscribe(result=>{this.cities=result})
  }

  //Recupera le previsioni per la città selezionata
  getForecast(){
    //Evito di effettuare troppe chiamate controllando se la città esiste ed è diversa dall'ultima città ricercata
    if(this.cityFormControl.value && this.cities.filter(c => c.city === this.cityFormControl.value).length && this.lastCity != this.cityFormControl.value){
      this.isCalling = true;
      console.log(this.cityFormControl.value);
      this.lastCity = this.cityFormControl.value;
      this.weatherForecastService.getWeatherForcast(this.cityFormControl.value).subscribe(result => {
        this.forecast = result;
        this.isCalling = false;
        this.callMoment = moment().format("DD/MM/yyyy HH:mm:ss")
      });
    }
  }

  //Forza l'aggiornamento dei dati visualizzati
  updateForecast(){
    this.weatherForecastService.getWeatherForcast(this.cityFormControl.value).subscribe(result => {
      this.forecast = result;
      this.isCalling = false;
    });
  }

  ///filtra le città al cambio del valore dell'autocomplete
  private _filterCities(value: string): City[] {
    const filterValue = value.toLowerCase();

    return this.cities.filter(city => city.city.toLowerCase().indexOf(filterValue) === 0);
  }

//#region Gestione Accordion

  step = 0;

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

  getTime(ms: number): string {
    return moment.unix(ms).format("HH:mm")
  }

  //#endregion
}
