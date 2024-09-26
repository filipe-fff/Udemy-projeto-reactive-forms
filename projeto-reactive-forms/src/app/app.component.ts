import { Component, inject, OnInit } from '@angular/core';
import { CountriesService } from './servise/countries.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  private readonly _countriesService: CountriesService = inject(CountriesService);

  countries: any;

  ngOnInit(): void {
      this._countriesService.getCountries().subscribe((countriesResponse) => this.countries = countriesResponse);
      console.log(this.countries);
  }
}