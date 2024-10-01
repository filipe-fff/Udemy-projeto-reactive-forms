import { AddressTypeEnum } from "../enums/address-type.enum";

export const AddressTypeDescriptionMap: {[key in AddressTypeEnum]: string} = {
    [AddressTypeEnum.RESIDENTIAL]: "Residencial",
    [AddressTypeEnum.WORK]: "Trabalho",
    [AddressTypeEnum.ALTERNATIVE]: "Alternativo",
}