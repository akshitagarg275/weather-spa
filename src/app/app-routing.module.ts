import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WeatherComponent } from './pages/weather/weather.component';
import { LoginComponent } from './pages/login/login.component';
import { ForecastComponent } from './pages/forecast/forecast.component';

const routes: Routes = [
  // Default route that redirects to the login page
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'weather', component: WeatherComponent },
  { path: 'forecast', component: ForecastComponent },
  // Catch-all route for undefined paths
  { path: '**', redirectTo: '/login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}