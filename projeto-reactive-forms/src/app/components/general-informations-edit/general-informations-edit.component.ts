import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CountriesList } from '../../types/countries-list';
import { StatesList } from '../../types/states-list';
import { ICountry } from '../../interfaces/countries/country.interface';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { IState } from '../../interfaces/states/state.interface';
import { prepareMaritalStatusList } from '../../utils/prepare-marital-status-list';
import { MaritalStatusItemList } from '../../types/marital-status-item-list';


@Component({
  selector: 'app-general-informations-edit',
  templateUrl: './general-informations-edit.component.html',
  styleUrl: './general-informations-edit.component.scss'
})
export class GeneralInformationsEditComponent implements OnInit, OnChanges {
  countriesListFiltered: CountriesList = [];
  statesListFiltered: StatesList = [];
  maritalStatusList: MaritalStatusItemList = [];

  @Input({ required: true }) countriesList: CountriesList = [];
  @Input({ required: true }) statesList: StatesList = [];
  @Input({ required: true }) userForm!: FormGroup;

  @Output("onCountrySelected") onUserSelectedEmmit = new EventEmitter<string>();

  ngOnInit(): void {
    this.watchCountryFormChangesAndFilter();

    this.watchStateFormChangesAndFilter();

    this.onMaritalStatusList();
  }

  ngOnChanges(changes: SimpleChanges): void {
      this.countriesListFiltered = this.countriesList;
      this.statesListFiltered = this.statesList;
  }

  onCountrySelected(country: MatAutocompleteSelectedEvent) {
    this.onUserSelectedEmmit.emit(country.option.value);
  }

  onMaritalStatusList() {
    this.maritalStatusList = [];
    prepareMaritalStatusList((maritalStatus) => {
      this.maritalStatusList.push({
        type: maritalStatus.type,
        typeDescription: maritalStatus.typeDescription,
      })
    })
  }
  

  private watchCountryFormChangesAndFilter() {
    this.country.valueChanges.subscribe(this.filterCountriesList.bind(this));
  }

  private filterCountriesList(searchTerm: string) {
    if (!searchTerm) return;

    this.countriesListFiltered = this.countriesList.filter(
      (country:ICountry) => country.name.toLowerCase().includes(searchTerm.toLowerCase().trim())
    );
  }

  private watchStateFormChangesAndFilter() {
    this.state.valueChanges.subscribe(this.filterStatesList.bind(this));
  }

  private filterStatesList(searchTerm: string) {
    if (!searchTerm) return;

    this.statesListFiltered = this.statesList.filter(
      (state: IState) => {
            return state.name.toLowerCase().includes(searchTerm.toLowerCase().trim())
        }
    );
  }

  get generalInformations(): FormGroup {
    return this.userForm.get("generalInformations") as FormGroup;
  }

  get email(): FormControl {
    return this.generalInformations.get("email") as FormControl;
  }

  get country(): FormControl {
    return this.generalInformations.get("country") as FormControl;
  }

  get state(): FormControl {
    return this.generalInformations.get("state") as FormControl;
  }
}