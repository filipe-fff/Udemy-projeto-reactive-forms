import { inject, Injectable } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { IUser } from "../../interfaces/users/user.interface";

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
                country: ["", Validators.required],
                state: ["", Validators.required],
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

    get countryForm(): FormControl {
        return this.generalInformations.get("country") as FormControl;
    }

    get stateForm(): FormControl {
        return this.generalInformations.get("state") as FormControl;
    }
}