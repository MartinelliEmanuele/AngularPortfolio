import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import { WeatherForecastService } from './weather-forecast.service';
import { WeatherForecast } from '../../../../shared/models/types';
import { environment } from 'src/environments/environment';

describe('WeatherForecastService', () => {
  let service: WeatherForecastService;
  let injector: TestBed;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [WeatherForecastService]
    });

    injector = getTestBed();
    service = TestBed.inject(WeatherForecastService);
    httpMock = injector.inject(HttpTestingController);
  });

  //verifica che non ci sono più chiamate in uscita
  afterEach(() => { httpMock.verify() })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  const mockServerResponse: WeatherForecast = {
    "coord": {
      "lon": -122.08,
      "lat": 37.39
    },
    "weather": [
      {
        "id": 800,
        "main": "Clear",
        "description": "clear sky",
        "icon": "01d"
      }
    ],
    "base": "stations",
    "main": {
      "temp": 282.55,
      "feels_like": 281.86,
      "temp_min": 280.37,
      "temp_max": 284.26,
      "pressure": 1023,
      "humidity": 100
    },
    "visibility": 16093,
    "wind": {
      "speed": 1.5,
      "deg": 350
    },
    "clouds": {
      "all": 1
    },
    "dt": 1560350645,
    "sys": {
      "type": 1,
      "id": 5122,
      "message": 0.0139,
      "country": "US",
      "sunrise": 1560343627,
      "sunset": 1560396563
    },
    "timezone": -25200,
    "id": 420006353,
    "name": "Mountain View",
    "cod": 200
  }

  it('getWeatherForcast() should return data', () => {
    service.getWeatherForcast("florence").subscribe((res)=>{
      expect(res).toEqual(mockServerResponse);
    })

    const req = httpMock.expectOne(`https://api.openweathermap.org/data/2.5/weather?q=florence&appid=${environment.weatherApiKey}&units=metric`);
    expect(req.request.method).toBe('GET');
    req.flush(mockServerResponse);
  })
});
