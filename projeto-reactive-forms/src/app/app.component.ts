import { Component, inject, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { take } from 'rxjs';
import { UsersService } from './services/users.service';
import { UsersList } from './types/users-list';
import { IUser } from './interfaces/users/user.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, OnChanges {
  usersList: UsersList = [];
  userSelected: IUser = {} as IUser;
  userSelectedIndex: number | undefined;

  tabSelectedIndex: number = 0;

  private readonly _usersService = inject(UsersService);


  ngOnInit(): void {
      this._usersService.getUsers().pipe(take(1)).subscribe((usersListResponse) => this.usersList = usersListResponse);
  }

  ngOnChanges(changes: SimpleChanges): void {
      this.tabSelectedIndex = 0;
  }

  onUserSelected(userIndex: number) {
    this.userSelectedIndex = userIndex;
    if(!this.usersList[userIndex]) return;

    this.userSelected = structuredClone(this.usersList[userIndex]);

    console.log(this.userSelected);
  }
}