import { inject, Injectable } from "@angular/core";
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { IUser } from "../../interfaces/users/user.interface";
import { preparePhoneList } from "../../utils/prepare-phone-list";
import { PhoneList } from "../../types/phone-list";
import { PhoneTypeDescriptionMap } from "../../utils/phone-type-description-map";
import { IPhoneToDisplay } from "../../interfaces/users/phone-to-display.interface";
import { convertStringToDate } from "../../utils/converStringToDate";
import { prepareAddressList } from "../../utils/prepare-address-list";
import { AddressList } from "../../types/address-list";
import { IAddress } from "../../interfaces/users/address.interface";
import { IAddreesToDisplay } from "../../interfaces/users/address-to-display.interface";
import { error } from "console";
import { requiredAddressValidator } from "../../utils/validators/required-address-validator";
import { DependentsList } from "../../types/dependents-list";
import { IDependent } from "../../interfaces/users/dependent.interface";

@Injectable({
    providedIn: "root",
})
export class UserFormController {
    userForm: FormGroup = {} as FormGroup;
    emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    private readonly _fb = inject(FormBuilder);

    constructor() {
        this.createUserFormGroup();
    }

    createUserFormGroup() {
        this.userForm = this._fb.group({
            generalInformations: this._fb.group({
                name: ["", Validators.required],
                email: ["", [Validators.required, Validators.pattern(this.emailPattern)]],
                country: ["", Validators.required],
                state: ["", Validators.required],
                maritalStatus: [null],
                monthlyIncome: [null, Validators.required],
                birthDate: [Date],
            }),
            contactInformations: this._fb.group({
                phoneList: this._fb.array([]),
                addressList: this._fb.array([]),
            }),
            dependentsList: this._fb.array([]),
        });
    }

    fullfillUserForm(user: IUser) {
        this.fullfillResetUserForm();

        this.fullfillGeneralInformations(user);
        this.fulfillPhoneList(user.phoneList);
        this.fulfillAddressList(user.addressList);
        this.fulfillDependentList(user.dependentsList);

        console.log(this.userForm.value);
    }

    onAddDependent() {
        this.depedentsList.push(this.addDependendent());
    }

    onRemoveDependent(dependentIndex: number) {
        this.depedentsList.removeAt(dependentIndex);
    }

    private fullfillResetUserForm() {
        this.userForm.reset();
        this.contactsInformations.reset();
        this.phoneList.clear();
        this.phoneList.reset();
        this.addressList.clear();
        this.addressList.reset();
        this.depedentsList.clear();
        this.depedentsList.reset();
    }

    private fullfillGeneralInformations(userResponse: IUser) {
        this.generalInformations.patchValue({
            ...userResponse,
            birthDate: convertStringToDate(userResponse.birthDate),
        });
    }

    private fulfillPhoneList(phoneListResponse: PhoneList) {
        preparePhoneList(phoneListResponse, false, (phone) => {
            this.phoneList.push(this.addPhone(phone));
        });
    }

    private addPhone(phone: IPhoneToDisplay): FormGroup {
        const validator = phone.typeDescription === PhoneTypeDescriptionMap[3]? [] : [Validators.required];

        return this._fb.group({
            type: [phone.type],
            typeDescription: [phone.typeDescription],
            number: [phone.phoneNumber, validator],
        });
    }

    private fulfillAddressList(addressResponse: AddressList) {
        prepareAddressList(addressResponse, false, (address) => {
            this.addressList.push(this.addAddress(address));
        });
    }

    private addAddress(address: IAddreesToDisplay): FormGroup {
        return this._fb.group({
            type: [address.type],
            typeDescription: [{ value: address.typeDescription, disabled: true}],
            street: [address.street],
            complement: [address.complement],
            country: [address.country],
            state: [address.state],
            city: [address.city],
        }, {validators: requiredAddressValidator})
    }

    private fulfillDependentList(dependentsResponse: DependentsList) {
        dependentsResponse.forEach((dependent: IDependent) => {
            this.depedentsList.push(this._fb.group({
                name: [dependent.name, Validators.required],
                age: [dependent.age, Validators.required],
                document: [dependent.document, Validators.required],
            }));
        });
    }

    private addDependendent(): FormGroup {
        return this._fb.group({
            name: ["", Validators.required],
            age: [null, Validators.required],
            document: [null, Validators.required],
        });
    }

    get generalInformations(): FormGroup {
        return this.userForm.get("generalInformations") as FormGroup;
    }

    get contactsInformations(): FormGroup {
        return this.userForm.get("contactInformations") as FormGroup;
    }

    get phoneList(): FormArray {
        return this.contactsInformations.get("phoneList") as FormArray;
    }

    get addressList(): FormArray {
        return this.contactsInformations.get("addressList") as FormArray;
    }

    get depedentsList(): FormArray {
        return this.userForm.get("dependentsList") as FormArray;
    }

    get countryForm(): FormControl {
        return this.generalInformations.get("country") as FormControl;
    }

    get stateForm(): FormControl {
        return this.generalInformations.get("state") as FormControl;
    }
}