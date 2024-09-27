import { Component, inject, OnInit } from '@angular/core';
import { CountriesService } from './services/countries.service';
import { take } from 'rxjs';
import { StatesService } from './services/states.service';
import { CitiesService } from './services/cities.service';
import { UsersService } from './services/users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  private readonly _countriesService = inject(CountriesService);
  private readonly _statesService = inject(StatesService);
  private readonly _citiesService = inject(CitiesService);
  private readonly _usersService = inject(UsersService);


  ngOnInit(): void {
      this._countriesService.getCountries().pipe(take(1)).subscribe((countries) => console.log(countries));
      this._statesService.getStates("Argentina").pipe(take(1)).subscribe((states) => console.log(states));
      this._citiesService.getCities("Brazil", "Rio Grande do Sul").pipe(take(1)).subscribe((cities) => console.log(cities));
      this._usersService.getUsers().pipe(take(1)).subscribe((users) => console.log(users));
  }
}