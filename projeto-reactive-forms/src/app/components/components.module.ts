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

registerLocaleData(localePT, "pt-BR");


@NgModule({
  declarations: [
    UsersListComponent,
    GeneralInformationsComponent,
    UserInfosItemComponent,
    ContactInformationsComponent,
    PhoneListComponent,
    AddressListComponent,
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    PipesModule,
  ],
  exports: [
    PipesModule,
    UsersListComponent,
    GeneralInformationsComponent,
    ContactInformationsComponent,
  ],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: "pt-BR",
    },
    {
      provide: DEFAULT_CURRENCY_CODE,
      useValue: "BRL",
    }
  ]
})
export class ComponentsModule { }