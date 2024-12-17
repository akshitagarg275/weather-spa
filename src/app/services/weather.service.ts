import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
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

  getForecast(city: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/forecast?q=${city}&units=metric&appid=${this.apiKey}`);
  }
}
