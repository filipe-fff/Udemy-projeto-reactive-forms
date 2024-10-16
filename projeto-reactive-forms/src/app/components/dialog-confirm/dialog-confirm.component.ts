import { DIALOG_DATA } from '@angular/cdk/dialog';
import { Component, Inject } from '@angular/core';
import { IDialogConfirmationData } from '../../interfaces/dialog-confirmation-data.interface';

@Component({
  selector: 'app-dialog-confirm',
  templateUrl: './dialog-confirm.component.html',
  styleUrl: './dialog-confirm.component.scss'
})
export class DialogConfirmComponent {
  constructor(@Inject(DIALOG_DATA) public data:IDialogConfirmationData ) {}
}