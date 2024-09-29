import { Component, Input } from '@angular/core';
import { IUser } from '../../interfaces/users/user.interface';

@Component({
  selector: 'app-contact-informations',
  templateUrl: './contact-informations.component.html',
  styleUrl: './contact-informations.component.scss'
})
export class ContactInformationsComponent {
  @Input({ required: true }) userSelected: IUser = {} as IUser;
}