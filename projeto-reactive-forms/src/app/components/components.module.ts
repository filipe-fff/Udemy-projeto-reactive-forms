import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { UsersListComponent } from './users-list/users-list.component';



@NgModule({
  declarations: [
    UsersListComponent,
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
  ],
  exports: [
    UsersListComponent,
  ]
})
export class ComponentsModule { }
