import { Component, inject, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { UsersService } from './services/users.service';
import { UsersList } from './types/users-list';
import { IUser } from './interfaces/user/user.interface';
import { MatDialog } from '@angular/material/dialog';
import { DialogConfirmComponent } from './components/dialog-confirm/dialog-confirm.component';
import { IDialogConfirmationData } from './interfaces/dialog-confirmation-data.interface';
import { UserFormRawValue } from './services/user-form-raw-value.service';
import { IUserForm } from './interfaces/user-form/user-form.interface';
import { convertUserFormToUser } from './utils/convert-user-form-to-user';

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
  userFormRawValue: IUserForm = {} as IUserForm;
  newUser: IUser = {} as IUser;


  private readonly _usersService = inject(UsersService);
  private readonly _dialogConfirm = inject(MatDialog);
  private readonly _userFormService = inject(UserFormRawValue);


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
    if(this.userFormUpdate) {
      this.openConfirmationsDialog({
        title: "O Formulário foi alterado",
        description: "Deseja realmente cancelar as alterações feitas no formulário?",
      }, (value: boolean) => {
        if(!value) return;
  
        this.isEditModel = false;
        this.userFormUpdate = false;
        this.userSelected = structuredClone(this.userSelected);
      });
    } else
        this.isEditModel = false;
  }

  onSaveButton() {
    this.openConfirmationsDialog({
      title: "Confirmar alteração de dados",
      description: "Deseja realmente salvar os valores alterados?",
    }, (value: boolean) => {
      if (!value) return;

        this.isEditModel = false;
        this.userFormUpdate = false;
        this.onUserFormRawValue(this._userFormService.userForm);
    });
  }

  onEnabledButtonSave(enabledButtonSave: boolean) {
    setTimeout(() => this.enabledButtonSave = enabledButtonSave, 0);
  }

  onUserFormFirstValueChanges() {
    this.userFormUpdate = true;
  }

  private onUserFormRawValue(userFormResponse: IUserForm) {
    this.userFormRawValue = userFormResponse;
    this.newUser = convertUserFormToUser(this.userFormRawValue) as IUser;
    console.log("newUser =>", this.newUser);
  }

  private openConfirmationsDialog(data: IDialogConfirmationData, callback: (value: boolean) => void) {
    const openDialog = this._dialogConfirm.open(DialogConfirmComponent, {
      data,
    });

    openDialog.afterClosed().subscribe(callback);
  }
}