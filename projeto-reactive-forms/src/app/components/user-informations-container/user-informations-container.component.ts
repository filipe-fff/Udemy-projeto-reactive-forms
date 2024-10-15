import { Component, EventEmitter, inject, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { IUser } from '../../interfaces/users/user.interface';
import { UserFormController } from './user-form-controller';
import { CountriesService } from '../../services/countries.service';
import { StatesService } from '../../services/states.service';

import { CountriesList } from '../../types/countries-list';
import { StatesList } from '../../types/states-list';
import { distinctUntilChanged, take } from 'rxjs';


@Component({
  selector: 'app-user-informations-container',
  templateUrl: './user-informations-container.component.html',
  styleUrl: './user-informations-container.component.scss'
})
export class UserInformationsContainerComponent extends UserFormController implements OnChanges, OnInit {
  @Input({ required: true }) userSelected: IUser = {} as IUser;
  @Input({ required: true }) tabSelectedIndex!: number;
  @Input({ required: true }) isEditModel!: boolean;
  @Output("onEnabledButtonSave") onEnabledButtonSaveEmitt = new EventEmitter<boolean>();
  
  private readonly countriesService = inject(CountriesService);
  private readonly statesService = inject(StatesService);
  
  countriesList: CountriesList = [];
  statesList: StatesList = [];


  ngOnInit(): void {
      this.getCountriesList();
      this.onUserStatusChanged();
  }

  ngOnChanges(changes: SimpleChanges): void {
      this.tabSelectedIndex = 0;
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

  private onUserStatusChanged() {
    this.userForm.statusChanges.pipe(distinctUntilChanged()).subscribe(() => {
      this.onEnabledButtonSaveEmitt.emit(this.userForm.valid);
    });
  }
}