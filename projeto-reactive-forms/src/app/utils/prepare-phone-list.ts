import { PhoneTypeEnum } from "../enums/phone-type.enum";
import { IPhoneToDisplay } from "../interfaces/users/phone-to-display.interface";
import { IPhone } from "../interfaces/users/phone.interface";
import { PhoneList } from "../types/phone-list";
import { PhoneTypeDescriptionMap } from "./phone-type-description-map";


export const preparePhoneList = (phoneList: PhoneList, isDisplayPhone: boolean, calback:(phone: IPhoneToDisplay) => void) => {
    
    Object.keys(PhoneTypeDescriptionMap).map(Number).forEach((phoneType: number) => {
        
        const phoneFound = phoneList.find((phone: IPhone) => phone.type === phoneType);

        let phoneNumber: string = "";
        
        phoneNumber = phoneFound? converPhoneToDisplay(phoneFound) : "-";

        calback({
            type: phoneType,
            typeDescription: PhoneTypeDescriptionMap[phoneType as PhoneTypeEnum],
            phoneNumber,
        });
    });
}

const converPhoneToDisplay = (phone: IPhone): string => {

    return `${phone.internationalCode} ${phone.areaCode} ${phone.number}`;
}