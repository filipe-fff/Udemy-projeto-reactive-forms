import { AddressTypeEnum } from "../enums/address-type.enum";
import { IAddreesToDisplay } from "../interfaces/users/address-to-display.interface";
import { IAddress } from "../interfaces/users/address.interface";
import { AddressList } from "../types/address-list";
import { AddressTypeDescriptionMap } from "./address-type-description-map";

export const prepareAddressList = (addressList: AddressList, isDisplayAddress: boolean, callback: (address: IAddreesToDisplay) => void) => {

    Object.keys(AddressTypeDescriptionMap).map(Number).forEach((addressType: number) => {

        const addressFound = addressList.find((address: IAddress) => address.type === addressType);
    
        let address: IAddreesToDisplay = {} as IAddreesToDisplay;

        address = convertAddressToDisplay(addressFound, addressType);

        callback({
            ...address,
        })
    });
}

const convertAddressToDisplay = (addressFound: IAddress | undefined, addressType: number):IAddreesToDisplay => {

    if (addressFound) {
        return {
            type: addressType,
            typeDescription: AddressTypeDescriptionMap[addressType as AddressTypeEnum],
            street: addressFound.street,
            complement: addressFound.complement,
            country: addressFound.country,
            state: addressFound.state,
            city: addressFound.city,
        }
    }

    return {
        type: addressType,
        typeDescription: AddressTypeDescriptionMap[addressType as AddressTypeEnum],
        street: "-",
        complement: "-",
        country: "-",
        state: "-",
        city: "-",
    }
}