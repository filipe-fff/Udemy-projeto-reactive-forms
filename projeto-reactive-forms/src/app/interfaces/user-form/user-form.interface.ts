import { DependentsList } from "../../types/dependents-list";
import { IContactsInformations } from "./contacts-informations.interface";
import { IGeneralInformationsForm } from "./general-informations.interface";

export interface IUserForm {
    generalInformations: IGeneralInformationsForm;
    contactInformations: IContactsInformations;
    dependentsList: DependentsList;
}