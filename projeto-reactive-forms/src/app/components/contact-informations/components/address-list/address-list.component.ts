import { Component, Input } from '@angular/core';
import { AddressList } from '../../../../types/address-list';

@Component({
  selector: 'app-address-list',
  templateUrl: './address-list.component.html',
  styleUrl: './address-list.component.scss'
})
export class AddressListComponent {
  addressListDisplay: AddressList = [];
  
  @Input({ required: true }) addressList: AddressList = [];
}