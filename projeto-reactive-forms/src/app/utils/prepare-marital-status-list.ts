import { MaritalStatusEnum } from "../enums/marital-status.enum";
import { IMaritalStatusItem } from "../interfaces/users/marital-status-item.interface";
import { MaritalStatusDescriptionMap } from "./marital-status-description-map";

export const prepareMaritalStatusList = (callback: (maritalStatus: IMaritalStatusItem) => void) => {

    Object.keys(MaritalStatusDescriptionMap).map(Number).forEach((type) => {

        callback ({
            type,
            typeDescription: MaritalStatusDescriptionMap[type as MaritalStatusEnum],
        });
    })
}