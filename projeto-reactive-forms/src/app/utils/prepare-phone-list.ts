import { PhoneTypeEnum } from "../enums/phone-type.enum";
import { IPhoneToDisplay } from "../interfaces/users/phone-to-display.interface";
import { IPhone } from "../interfaces/users/phone.interface";
import { PhoneList } from "../types/phone-list";
import { PhoneTypeDescriptionMap } from "./phone-type-description-map";


export const preparePhoneList = (phoneList: PhoneList, isToDisplay: boolean, calback:(phone: IPhoneToDisplay) => void) => {
    
    Object.keys(PhoneTypeDescriptionMap).map(Number).forEach((phoneType: number) => {
        
        const phoneFound = phoneList.find((phone) => phone.type === phoneType);

        let phoneNumber = "";

        if (isToDisplay)
            phoneNumber = phoneFound? convertPhoneToDisplay(phoneFound) : "-";
        else
            phoneNumber = phoneFound? convertPhoneToEdit(phoneFound): "";

        calback({
            type: phoneType,
            typeDescription: PhoneTypeDescriptionMap[phoneType as PhoneTypeEnum],
            phoneNumber,
        });
    });
}

const convertPhoneToDisplay = (phone: IPhone): string => {

    return `${phone.internationalCode} ${phone.areaCode} ${phone.number}`;
}

const convertPhoneToEdit = (phone: IPhone): string => {

    return `${phone.internationalCode}${phone.areaCode}${phone.number}`.replace("+", "").replace("-", "");
}