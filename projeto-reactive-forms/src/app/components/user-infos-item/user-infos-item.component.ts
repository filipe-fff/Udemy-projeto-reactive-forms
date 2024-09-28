import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-user-infos-item',
  templateUrl: './user-infos-item.component.html',
  styleUrl: './user-infos-item.component.scss'
})
export class UserInfosItemComponent {
  @Input({ required: true }) title!: string;
  @Input({ required: true }) description!: string | null;
}