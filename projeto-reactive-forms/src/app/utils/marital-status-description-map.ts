import { MaritalStatusEnum } from "../enums/marital-status.enum";

export const MaritalStatusDescriptionMap: {[key in MaritalStatusEnum]: string} = {
    [MaritalStatusEnum.SINGLE]: "Solteiro",
    [MaritalStatusEnum.MARRIED]: "Casado",
    [MaritalStatusEnum.DIVORCED]: "Divorciado",
}