import { Pipe, PipeTransform } from "@angular/core";
import { AddressList } from "../types/address-list";
import { AddressTypeEnum } from "../enums/address-type.enum";

@Pipe({
    name: 'addressListDisplay',
})
export class AddressListDisplay implements PipeTransform{
    transform(addressList: AddressList) {
        addressListDisplay: addressList = Object.keys(AddressTypeEnum).filter((addressType: number) => {
            const addressFound = addressList.find()
        });
    }
}