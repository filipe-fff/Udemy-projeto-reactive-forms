import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { PhoneList } from '../../../../types/phone-list';
import { PhoneToDisplayList } from '../../../../types/phone-to-display-list';
import { preparePhoneList } from '../../../../utils/prepare-phone-list';

@Component({
  selector: 'app-phone-list',
  templateUrl: './phone-list.component.html',
  styleUrl: './phone-list.component.scss'
})
export class PhoneListComponent implements OnChanges {
  phoneToDisplayList: PhoneToDisplayList = [];

  @Input({ required: true }) phoneList: PhoneList = [];

  ngOnChanges(changes: SimpleChanges): void {

      const HAS_PHONE_LIST = changes["phoneList"].currentValue;
      
      if(HAS_PHONE_LIST) {
        this.phoneToDisplayList = [];

        preparePhoneList(this.phoneList, true, (phone) => {
              this.phoneToDisplayList.push({
                type: phone.type,
                typeDescription: phone.typeDescription,
                phoneNumber: phone.phoneNumber,
              });
        })  
      }
  }
}