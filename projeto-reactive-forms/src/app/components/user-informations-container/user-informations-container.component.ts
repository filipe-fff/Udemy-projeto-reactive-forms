import { Component, EventEmitter, inject, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { IUser } from '../../interfaces/user/user.interface';
import { UserFormController } from './user-form-controller';
import { CountriesService } from '../../services/countries.service';
import { StatesService } from '../../services/states.service';

import { CountriesList } from '../../types/countries-list';
import { StatesList } from '../../types/states-list';
import { distinctUntilChanged, Subscription, take } from 'rxjs';


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
  @Output("onUserFormFirstValueChanges") onUserFormValueChangesEmitt = new EventEmitter<void>() ;
  
  private readonly countriesService = inject(CountriesService);
  private readonly statesService = inject(StatesService);
  
  countriesList: CountriesList = [];
  statesList: StatesList = [];
  userFormValueChangesSubs!: Subscription;


  ngOnInit(): void {
      this.getCountriesList();
  }

  ngOnChanges(changes: SimpleChanges): void {
      this.tabSelectedIndex = 0;
      const HAS_USER_SELECTED = changes["userSelected"] && Object.keys(changes["userSelected"].currentValue).length > 0;

      if (HAS_USER_SELECTED) {
        if(this.userFormValueChangesSubs) this.userFormValueChangesSubs.unsubscribe();


        this.fullfillUserForm(this.userSelected);
        this.getStatesList(this.userSelected.country);
        this.onUserFormFirstValueChanges();
        this.onUserStatusChanges();

        this.onUserFormRawValue();
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

  private onUserStatusChanges() {
    this.userForm.statusChanges.pipe(distinctUntilChanged()).subscribe(() => {
      this.onEnabledButtonSaveEmitt.emit(this.userForm.valid);
    });
  }

  private onUserFormFirstValueChanges() {
    this.userFormValueChangesSubs = this.userForm.valueChanges.subscribe(() => {
      this.onUserFormValueChangesEmitt.emit();
      this.onUserFormRawValue();
    });
  }
}