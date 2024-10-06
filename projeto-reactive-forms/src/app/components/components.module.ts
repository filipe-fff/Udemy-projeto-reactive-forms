import { DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { UsersListComponent } from './users-list/users-list.component';
import { GeneralInformationsComponent } from './general-informations/general-informations.component';
import { UserInfosItemComponent } from './user-infos-item/user-infos-item.component';
import { PipesModule } from '../pipes/pipes.module';
import localePT from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';
import { ContactInformationsComponent } from './contact-informations/contact-informations.component';
import { PhoneListComponent } from './contact-informations/components/phone-list/phone-list.component';
import { AddressListComponent } from './contact-informations/components/address-list/address-list.component';
import { DependentsListComponent } from './dependents-list/dependents-list.component';
import { ButtonsContainerComponent } from './buttons-container/buttons-container.component';
import { UserInformationsContainerComponent } from './user-informations-container/user-informations-container.component';
import { GeneralInformationsEditComponent } from './general-informations-edit/general-informations-edit.component';
import { ContactInformationsEditComponent } from './contact-informations-edit/contact-informations-edit.component';
import { DependentsListEditComponent } from './dependents-list-edit/dependents-list-edit.component';
import { AddressListEditComponent } from './contact-informations-edit/components/address-list-edit/address-list-edit.component';
import { PhoneListEditComponent } from './contact-informations-edit/components/phone-list-edit/phone-list-edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';

registerLocaleData(localePT, "pt-BR");


@NgModule({
  declarations: [
    UsersListComponent,
    GeneralInformationsComponent,
    UserInfosItemComponent,
    ContactInformationsComponent,
    PhoneListComponent,
    AddressListComponent,
    DependentsListComponent,
    ButtonsContainerComponent,
    UserInformationsContainerComponent,
    GeneralInformationsEditComponent,
    ContactInformationsEditComponent,
    DependentsListEditComponent,
    AddressListEditComponent,
    PhoneListEditComponent,
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    PipesModule,
    ReactiveFormsModule,
    NgxMaskDirective,
  ],
  exports: [
    PipesModule,
    UsersListComponent,
    ButtonsContainerComponent,
    UserInformationsContainerComponent,
  ],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: "pt-BR",
    },
    {
      provide: DEFAULT_CURRENCY_CODE,
      useValue: "BRL",
    },
    provideNgxMask(),
  ]
})
export class ComponentsModule { }