import { PhoneTypeEnum } from "../enums/phone-type.enum";
import { IPhoneToDisplay } from "../interfaces/user/phone-to-display.interface";
import { IPhone } from "../interfaces/user/phone.interface";
import { PhoneList } from "../types/phone-list";
import { PhoneTypeDescriptionMap } from "./phone-type-description-map";


export const preparePhoneList = (phoneList: PhoneList, isToDisplay: boolean, calback:(phone: IPhoneToDisplay) => void) => {
    
    Object.keys(PhoneTypeDescriptionMap).map(Number).forEach((phoneType: number) => {
        
        const phoneFound = phoneList.find((phone) => phone.type === phoneType);

        let number = "";

        if (isToDisplay)
            number = phoneFound? convertPhoneToDisplay(phoneFound) : "-";
        else
            number = phoneFound? convertPhoneToEdit(phoneFound): "";

        calback({
            type: phoneType,
            typeDescription: PhoneTypeDescriptionMap[phoneType as PhoneTypeEnum],
            number,
        });
    });
}

const convertPhoneToDisplay = (phone: IPhone): string => {

    return `${phone.internationalCode} ${phone.areaCode} ${phone.number}`;
}

const convertPhoneToEdit = (phone: IPhone): string => {

    return `${phone.internationalCode}${phone.areaCode}${phone.number}`.replace("+", "").replace("-", "");
}