import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CountriesList } from '../../types/countries-list';
import { StatesList } from '../../types/states-list';
import { ICountry } from '../../interfaces/countries/country.interface';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { IState } from '../../interfaces/states/state.interface';


@Component({
  selector: 'app-general-informations-edit',
  templateUrl: './general-informations-edit.component.html',
  styleUrl: './general-informations-edit.component.scss'
})
export class GeneralInformationsEditComponent implements OnInit, OnChanges {
  countriesListFiltered: CountriesList = [];
  statesListFiltered: StatesList = [];

  @Input({ required: true }) countriesList: CountriesList = [];
  @Input({ required: true }) statesList: StatesList = []
  @Input({ required: true }) userForm!: FormGroup;

  @Output("onCountrySelected") onUserSelectedEmmit = new EventEmitter<string>();

  ngOnInit(): void {
    this.watchCountryFormChangesAndFilter();

    this.watchStatesFormChangesAndFilter();
  }

  ngOnChanges(changes: SimpleChanges): void {
      this.countriesListFiltered = this.countriesList;
      this.statesListFiltered = this.statesList;
  }

  onCountrySelected(country: MatAutocompleteSelectedEvent) {
    this.onUserSelectedEmmit.emit(country.option.value);
  }

  private watchCountryFormChangesAndFilter() {
    this.countryControl.valueChanges.subscribe(this.filterCountriesList.bind(this));
  }

  private filterCountriesList(searchTerm: string) {
    if (!searchTerm) return;

    this.countriesListFiltered = this.countriesList.filter(
      (country:ICountry) => country.name.toLowerCase().includes(searchTerm.toLowerCase().trim())
    );
  }

  private watchStatesFormChangesAndFilter() {
    this.stateControl.valueChanges.subscribe(this.filterStatesList.bind(this));
  }

  private filterStatesList(searchTerm: string) {
    if (!searchTerm) return;

    this.statesListFiltered = this.statesList.filter(
      (state: IState) => state.name.toLowerCase().includes(searchTerm.toLowerCase().trim())
    );
    console.log("statesList =>", this.statesList);
    console.log("statesListFiltered =>", this.statesListFiltered);
  }

  get generalInformationsGroup(): FormGroup {
    return this.userForm.get("generalInformations") as FormGroup;
  }

  get emailControls(): FormControl {
    return this.generalInformationsGroup.get("email") as FormControl;
  }

  get countryControl(): FormControl {
    return this.generalInformationsGroup.get("country") as FormControl;
  }

  get stateControl(): FormControl {
    return this.generalInformationsGroup.get("state") as FormControl;
  }
}