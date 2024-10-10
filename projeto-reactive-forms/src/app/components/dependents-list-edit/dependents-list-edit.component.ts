import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-dependents-list-edit',
  templateUrl: './dependents-list-edit.component.html',
  styleUrl: './dependents-list-edit.component.scss'
})
export class DependentsListEditComponent {
  @Input({ required: true }) userForm: FormGroup = {} as FormGroup;
  @Output("onAddDependent") onAddDependentEmitt = new EventEmitter<void>();
  @Output("onRemoveDependent") onRemoveDependentEmitt = new EventEmitter<number>();

  addDependent() {
    this.onAddDependentEmitt.emit();
  }

  removeDependent(dependentIndex: number) {
    this.onRemoveDependentEmitt.emit(dependentIndex);
  }
  
  get dependentsList(): FormArray {
    return this.userForm.get("dependentsList") as FormArray;
  }
}