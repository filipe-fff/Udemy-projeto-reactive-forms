import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {
  private readonly _https: HttpClient = inject(HttpClient);

  getCountries(): Observable<any> {
    return this._https.get("https://countriesnow.space/api/v0.1/countries/positions");
  }
}