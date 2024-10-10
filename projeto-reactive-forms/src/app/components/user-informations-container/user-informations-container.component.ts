import { Component, inject, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { IUser } from '../../interfaces/users/user.interface';
import { UserFormController } from './user-form-controller';
import { CountriesService } from '../../services/countries.service';
import { StatesService } from '../../services/states.service';

import { CountriesList } from '../../types/countries-list';
import { StatesList } from '../../types/states-list';
import { take } from 'rxjs';


@Component({
  selector: 'app-user-informations-container',
  templateUrl: './user-informations-container.component.html',
  styleUrl: './user-informations-container.component.scss'
})
export class UserInformationsContainerComponent extends UserFormController implements OnChanges, OnInit {
  countriesList: CountriesList = [];
  statesList: StatesList = [];

  private readonly countriesService = inject(CountriesService);
  private readonly statesService = inject(StatesService);

  @Input({ required: true }) userSelected: IUser = {} as IUser;
  @Input({ required: true }) tabSelectedIndex!: number;

  @Input({ required: true }) isEditModel: boolean = false;


  ngOnInit(): void {
      this.getCountriesList();
  }

  ngOnChanges(changes: SimpleChanges): void {
      this.tabSelectedIndex = 2;
      const HAS_USER_SELECTED = changes["userSelected"] && Object.keys(changes["userSelected"].currentValue).length > 0;

      if (HAS_USER_SELECTED) {
        this.fullfillUserForm(this.userSelected);

        this.getStatesList(this.userSelected.country);
      }
  }

  onCountrySelected(country: string) {
    this.getStatesList(country);
  }

  private getCountriesList() {
    this.countriesService.getCountries().pipe(take(1)).subscribe((countriesList: CountriesList) => {
      this.countriesList = countriesList;
    });
  }

  private getStatesList(country: string) {
    this.statesService.getStates(country).pipe(take(1)).subscribe((statesList) => this.statesList = statesList);
  }
}