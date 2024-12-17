import { Component } from '@angular/core';
import { WeatherService } from 'src/app/services/weather.service';
import { Router } from '@angular/router';
import { trigger, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('500ms ease-in', style({ opacity: 1 })),
      ]),
    ]),
  ],
})
export class WeatherComponent {
  city: string = '';
  weather: any;
  loading: boolean = false;

  constructor(private router: Router,private weatherService: WeatherService) {
    console.log("Weather component")
  }

  // Method to navigate to the forecast page
  viewForecast() {
    this.router.navigate(['/forecast']);
  }

  // Method to fetch the current weather data for the entered city
  fetchWeather() {
    if (this.city.trim() === '') return;

    this.loading = true;

    this.weatherService.getCurrentWeather(this.city).subscribe({
      next: (data: any) => {
        this.weather = data;
        this.loading = false;
        },
      error: () => {
        alert('City not found or no forecast available!');
        this.loading = false;
      },
    });
  }
}
