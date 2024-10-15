import { Component, inject, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { UsersService } from './services/users.service';
import { UsersList } from './types/users-list';
import { IUser } from './interfaces/users/user.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  usersList: UsersList = [];
  userSelected: IUser = {} as IUser;
  userSelectedIndex: number | undefined;
  tabSelectedIndex: number = 0;

  isEditModel: boolean = false;
  enabledButtonSave!: boolean;
  userFormUpdate = false;


  private readonly _usersService = inject(UsersService);


  ngOnInit(): void {
      this._usersService.getUsers().pipe(take(1)).subscribe((usersListResponse) => this.usersList = usersListResponse);
  }

  onUserSelected(userIndex: number) {

    const userFound = this.usersList[userIndex];

    if(userFound) {
      this.userSelectedIndex = userIndex;
      this.userSelected = structuredClone(this.usersList[userIndex]);
    }
  }

  onEditButton() {
    this.isEditModel = true;
    this.userFormUpdate = false;
  }

  onCancelButton() {
    this.isEditModel = false;
    this.userFormUpdate = false;
    this.userSelected = structuredClone(this.userSelected);
  }

  onSaveButton() {
    this.userFormUpdate = false;
  }

  onEnabledButtonSave(enabledButtonSave: boolean) {
    setTimeout(() => this.enabledButtonSave = enabledButtonSave, 0);
  }

  onUserFormFirstValueChanges() {
    this.userFormUpdate = true;
  }
}