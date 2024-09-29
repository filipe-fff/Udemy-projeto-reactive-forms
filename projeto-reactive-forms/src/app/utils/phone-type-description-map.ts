import { PhoneTypeEnum } from "../enums/phone-type.enum";

export const PhoneTypeDescriptionMap: {[key in PhoneTypeEnum]: string} = {
    [PhoneTypeEnum.RESIDENTIAL]: "Residencial",
    [PhoneTypeEnum.PHONE]: "Celular",
    [PhoneTypeEnum.EMERGENCY]: "Emergêncial",
}