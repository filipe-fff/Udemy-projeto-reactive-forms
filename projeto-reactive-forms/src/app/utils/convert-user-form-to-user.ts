import { IUserForm } from "../interfaces/user-form/user-form.interface";
import { IDependent } from "../interfaces/user/dependent.interface";
import { IPhoneToDisplay } from "../interfaces/user/phone-to-display.interface";
import { IUser } from "../interfaces/user/user.interface";
import { AddressList } from "../types/address-list";
import { DependentsList } from "../types/dependents-list";
import { PhoneList } from "../types/phone-list";
import { convertDateToString } from "./convert-date-to-string";

export const convertUserFormToUser = (userForm: IUserForm): Partial<IUser> => {

    let newUser: Partial<IUser> = {} as Partial<IUser>;

    newUser = generalInformations(userForm);
    newUser.phoneList = phoneList(userForm);
    newUser.addressList = addressList(userForm);
    newUser.dependentsList = dependentsList(userForm);

    return newUser;
};

const generalInformations = (userForm: IUserForm): Partial<IUser> => {
    return({
        name: userForm.generalInformations.name,
        email: userForm.generalInformations.email,
        country: userForm.generalInformations.country,
        state: userForm.generalInformations.state,
        maritalStatus: userForm.generalInformations.maritalStatus,
        monthlyIncome: userForm.generalInformations.monthlyIncome,
        birthDate: convertDateToString(userForm.generalInformations.birthDate),
    });
}

const phoneList = (userForm: IUserForm): PhoneList => {
    return userForm.contactInformations.phoneList.map((phone: IPhoneToDisplay) => {
        const areaCode = `+${phone.number.slice(0, 2)}`;
        const internationalCode = `${phone.number.slice(2, 4)}`;
        const number = `${phone.number.slice(4, -4)}-${phone.number.slice(-4)}`;

        return {
            type: phone.type,
            areaCode,
            internationalCode,
            number,
        }
    }).filter((phone) => phone.internationalCode.length > 0);
}

const addressList = (userForm: IUserForm): AddressList => {
    return userForm.contactInformations.addressList.filter((address) => address.city);
}

const dependentsList = (userForm: IUserForm): DependentsList => {
    return userForm.dependentsList.map((dependent: IDependent) => {
        return {
            name: dependent.name,
            age: +dependent.age,
            document: +dependent.document,
        }
    });
}