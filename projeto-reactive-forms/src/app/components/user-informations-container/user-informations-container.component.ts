import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { IUser } from '../../interfaces/users/user.interface';
import { UserFormController } from './user-form-controller';

@Component({
  selector: 'app-user-informations-container',
  templateUrl: './user-informations-container.component.html',
  styleUrl: './user-informations-container.component.scss'
})
export class UserInformationsContainerComponent extends UserFormController implements OnChanges {
  @Input({ required: true }) userSelected: IUser = {} as IUser;
  @Input({ required: true }) isEditModel: boolean = false;
  @Input({ required: true }) tabSelectedIndex!: number;


  ngOnChanges(changes: SimpleChanges): void {
      const USER_SELECTED = changes["userSelected"];

      if (USER_SELECTED) {
        this.tabSelectedIndex = 0;
        this.userSelectedControl = this.userSelected;
      }
  }
}