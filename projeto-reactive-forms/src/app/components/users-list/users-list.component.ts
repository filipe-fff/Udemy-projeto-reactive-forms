import { Component, Input } from '@angular/core';
import { UsersList } from '../../types/users-list';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss'
})
export class UsersListComponent {
  @Input({ required: true }) usersList: UsersList | undefined = [];
}