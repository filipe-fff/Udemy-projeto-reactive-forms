import { Component, inject, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { IUser } from '../../interfaces/users/user.interface';
import { UserFormController } from './user-form-controller';
import { CountriesService } from '../../services/countries.service';
import { StatesService } from '../../services/states.service';
import { CitiesService } from '../../services/cities.service';
import { CountriesList } from '../../types/countries-list';
import { StatesList } from '../../types/states-list';
import { take } from 'rxjs';


@Component({
  selector: 'app-user-informations-container',
  templateUrl: './user-informations-container.component.html',
  styleUrl: './user-informations-container.component.scss'
})
export class UserInformationsContainerComponent extends UserFormController implements OnChanges, OnInit {
  private readonly countriesService = inject(CountriesService);
  private readonly statesService = inject(StatesService);
  
  countriesList: CountriesList = [];
  statesList: StatesList = [];

  @Input({ required: true }) userSelected: IUser = {} as IUser;
  @Input({ required: true }) tabSelectedIndex!: number;

  @Input({ required: true }) isEditModel: boolean = false;

  ngOnInit(): void {
      this.getCountries();
  }

  ngOnChanges(changes: SimpleChanges): void {
      const USER_SELECTED = changes["userForm"] && Object.keys(changes["userForm"].currentValue).length > 0;

      if (USER_SELECTED) {
        this.tabSelectedIndex = 0;
        this.userSelectedControl = this.userSelected;
        
        this.getGeneralInformations(this.userSelected);
      }
  }

  getCountries() {
    this.countriesService.getCountries().pipe(take(1)).subscribe((countriesResponse) => {
      this.countriesList = countriesResponse;
    });
  }

  getStates(country: string) {
    this.statesService.getStates(country).pipe(take(1)).subscribe((statesResponse) => this.statesList = statesResponse);
  }
}