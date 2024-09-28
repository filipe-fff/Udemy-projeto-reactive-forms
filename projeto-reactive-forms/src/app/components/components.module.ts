import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { UsersListComponent } from './users-list/users-list.component';
import { GeneralInformationsComponent } from './general-informations/general-informations.component';
import { UserInfosItemComponent } from './user-infos-item/user-infos-item.component';



@NgModule({
  declarations: [
    UsersListComponent,
    GeneralInformationsComponent,
    UserInfosItemComponent,
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
  ],
  exports: [
    UsersListComponent,
    GeneralInformationsComponent,
  ]
})
export class ComponentsModule { }
