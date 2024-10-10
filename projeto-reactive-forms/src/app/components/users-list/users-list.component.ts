import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UsersList } from '../../types/users-list';


@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss'
})
export class UsersListComponent {
  userSelectedIndex: number | undefined;

  @Input({ required: true }) usersList: UsersList = [];
  @Input({ required: true }) isEditModel: boolean = false;

  @Output("onUserSelected") onUserSelectedEmitt = new EventEmitter<number>();

  onUserSelected(userIndex: number) {
    if (this.isEditModel) return;

    this.userSelectedIndex = userIndex;
    this.onUserSelectedEmitt.emit(userIndex);
  }
}