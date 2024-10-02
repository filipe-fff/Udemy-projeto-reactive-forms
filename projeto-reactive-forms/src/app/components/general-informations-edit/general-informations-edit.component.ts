import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-general-informations-edit',
  templateUrl: './general-informations-edit.component.html',
  styleUrl: './general-informations-edit.component.scss'
})
export class GeneralInformationsEditComponent {
  @Input({ required: true }) userForm: FormGroup = {} as FormGroup;

  get generalInformations(): FormGroup {
    return this.userForm.get("generalInformations") as FormGroup;
  }

  get email(): FormControl {
    return this.generalInformations.get("email") as FormControl;
  }
}