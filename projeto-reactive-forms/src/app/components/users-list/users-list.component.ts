import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UsersList } from '../../types/users-list';


@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss'
})
export class UsersListComponent {
  @Input({ required: true }) usersList: UsersList | undefined = [];
  @Output("onUserSelected") onUserSelectedEmitt = new EventEmitter<number>();

  onUserSelected(userIndex: number) {
    this.onUserSelectedEmitt.emit(userIndex);
  }
}