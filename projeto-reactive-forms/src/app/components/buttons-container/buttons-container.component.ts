import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-buttons-container',
  templateUrl: './buttons-container.component.html',
  styleUrl: './buttons-container.component.scss'
})
export class ButtonsContainerComponent implements OnChanges {
  @Input({ required: true }) isEditModel!: boolean;
  @Input({ required: true }) enabledButtonSave!: boolean;

  @Output("onEditButton") onEditButtonEmitt = new EventEmitter<void>();
  @Output("onCancelButton") onCancelButtonEmitt = new EventEmitter<void>();
  @Output("onSalveButton") onSalveButtonEmitt = new EventEmitter<void>();

  ngOnChanges(changes: SimpleChanges): void {
      console.log("isEditModel", this.isEditModel);
      console.log("enabledButtonSave", this.enabledButtonSave);
  }

  onEditButton() {
    this.onEditButtonEmitt.emit();
  }

  onCancelButton() {
    this.onCancelButtonEmitt.emit();
  }

  onSaveButton() {
    console.log("onSaveButton");
    this.onSalveButtonEmitt.emit();
  }
}