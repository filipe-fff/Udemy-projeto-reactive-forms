import { inject, Injectable, OnChanges, OnInit, SimpleChanges } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { IUser } from "../../interfaces/users/user.interface";
import { PhoneList } from "../../types/phone-list";

@Injectable({
    providedIn: "root",
})
export class UserFormController {
    userSelectedControl: IUser = {} as IUser;
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
                country: [""],
                state: [""],
                maritalStatus: [null],
                monthlyIncome: [null, Validators.required],
                birthDate: [Date],
            }),
            contactsInformations: this._fb.group({
                phoneList: this._fb.array([]),
                addressList: this._fb.array([]),
            }),
            dependentsList: this._fb.array([]),
        });
    }

    getGeneralInformations(user: IUser) {
        this.generalInformations.patchValue({
            ...user,
            birthDate: new Date(),
        }); 
    }

    get generalInformations(): FormGroup {
        return this.userForm.get("generalInformations") as FormGroup;
    }
}