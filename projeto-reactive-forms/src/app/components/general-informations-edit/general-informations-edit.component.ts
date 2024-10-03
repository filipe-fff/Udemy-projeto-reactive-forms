import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CountriesList } from '../../types/countries-list';
import { StatesList } from '../../types/states-list';

@Component({
  selector: 'app-general-informations-edit',
  templateUrl: './general-informations-edit.component.html',
  styleUrl: './general-informations-edit.component.scss'
})
export class GeneralInformationsEditComponent implements OnChanges {
  @Input({ required: true }) countriesList: CountriesList = [];
  @Input({ required: true }) statesList: StatesList = []
  @Input({ required: true }) userForm: FormGroup = {} as FormGroup;

  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.userForm.value);
  }

  get generalInformations(): FormGroup {
    return this.userForm.get("generalInformations") as FormGroup;
  }

  get email(): FormControl {
    return this.generalInformations.get("email") as FormControl;
  }
}