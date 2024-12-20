import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, switchMap } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private baseUrl = environment.apiBaseUrl;
  private apiKey = environment.apiKey;

  constructor(private http: HttpClient) {}

  getCurrentWeather(city: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/weather?q=${city}&units=metric&appid=${this.apiKey}`);
  }

  getCityCoordinates(city: string): Observable<any> {
    return this.http.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${this.apiKey}`);
  }

  getForecast(city: string): Observable<any> {
    console.log("1st city: ", city)
    return this.getCityCoordinates(city).pipe(
      switchMap((cityData: any) => {
        console.log("cityData: ", cityData)
        const lat = cityData.coord.lat;
        const lon = cityData.coord.lon;
        // Fetching hourly forecast (data is provided in 3-hour intervals)
        const forecastUrl = `${this.baseUrl}/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${this.apiKey}`;
        return this.http.get(forecastUrl);
      })
    );
  }
  
}
