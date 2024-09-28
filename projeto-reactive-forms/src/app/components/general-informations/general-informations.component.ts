import { Component, Input } from '@angular/core';
import { IUser } from '../../interfaces/users/user.interface';

@Component({
  selector: 'app-general-informations',
  templateUrl: './general-informations.component.html',
  styleUrl: './general-informations.component.scss'
})
export class GeneralInformationsComponent {
  @Input({ required: true }) userSelected: IUser = {} as IUser;
}