import { Component } from '@angular/core';
import { WeatherService } from 'src/app/services/weather.service';

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.scss'],
})
export class ForecastComponent {
  city: string = '';
  forecast: any[] = [];
  loading: boolean = false;

  constructor(private weatherService: WeatherService) {}

  // Method to fetch the weather forecast for the entered city
  fetchForecast() {
    if (this.city.trim() === '') return;

    this.loading = true;
    this.weatherService.getForecast(this.city).subscribe({
      next: (data) => {
        // Map the response data to a simplified format for display
        this.forecast = data.list.map((entry: any) => ({
          date: new Date(entry.dt * 1000).toLocaleDateString(),
          temp: entry.main.temp,
          weather: entry.weather[0].description,
          humidity: entry.main.humidity,
        }));
        this.loading = false;
      },
      error: () => {
        alert('City not found or no forecast available!');
        this.loading = false;
      },
    });
  }
}
