import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { City } from '../../shared/models/types';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor(private http: HttpClient) { }

  getCitiesFromJson(): Observable<City[]>{
    return this.http.get<City[]>("../../../../assets/cities/it.json")
  }
}
