import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AddressList } from '../../../../types/address-list';
import { prepareAddressList } from '../../../../utils/prepare-address-list';
import { IAddreesToDisplay } from '../../../../interfaces/users/address-to-display.interface';
import { AddressToDisplayList } from '../../../../types/address-to-display-list';

@Component({
  selector: 'app-address-list',
  templateUrl: './address-list.component.html',
  styleUrl: './address-list.component.scss'
})
export class AddressListComponent implements OnChanges {
  addressToDisplayList: AddressToDisplayList = [];
  
  @Input({ required: true }) addressList: AddressList = [];

  ngOnChanges(changes: SimpleChanges): void {
      
    const HAS_ADDRESS_LIST = changes["addressList"].currentValue;
    
    if (HAS_ADDRESS_LIST) {
      this.addressToDisplayList = [];

      prepareAddressList(this.addressList, true, (address) => {
        this.addressToDisplayList.push(address);
      })
    }
  }
}