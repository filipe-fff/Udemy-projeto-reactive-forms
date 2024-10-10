import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  imports: [
    MatCardModule,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    MatAutocompleteModule,
    MatRadioModule,
    MatDatepickerModule,
    MatIconModule,
  ],
  exports: [
    MatCardModule,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    MatAutocompleteModule,
    MatRadioModule,
    MatDatepickerModule,
    MatIconModule,
  ],
  providers: [
    provideNativeDateAdapter(),
  ]
})
export class AngularMaterialModule { }