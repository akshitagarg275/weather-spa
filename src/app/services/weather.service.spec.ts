import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { WeatherService } from './weather.service';
import { environment } from 'src/environments/environment';

describe('WeatherService', () => {
  let service: WeatherService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [WeatherService],
    });

    service = TestBed.inject(WeatherService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should fetch current weather', () => {
    const mockResponse = {
      name: 'London',
      main: { temp: 15 },
      weather: [{ description: 'clear sky' }],
    };

    service.getCurrentWeather('London').subscribe((data) => {
      expect(data.name).toBe('London');
      expect(data.main.temp).toBe(15);
    });

    const req = httpMock.expectOne(
      `${environment.apiBaseUrl}/weather?q=London&units=metric&appid=${environment.apiKey}`
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should fetch forecast', () => {
    const mockResponse = {
      list: [
        { dt: 1618308000, main: { temp: 15 }, weather: [{ description: 'cloudy' }] },
      ],
    };

    service.getForecast('London').subscribe((data) => {
      expect(data.list.length).toBeGreaterThan(0);
      expect(data.list[0].main.temp).toBe(15);
    });

    const req = httpMock.expectOne(
      `${environment.apiBaseUrl}/forecast?q=London&units=metric&appid=${environment.apiKey}`
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });
});
