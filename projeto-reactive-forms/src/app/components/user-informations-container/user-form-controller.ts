import { inject, Injectable, OnChanges, OnInit, SimpleChanges } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { IUser } from "../../interfaces/users/user.interface";
import { PhoneList } from "../../types/phone-list";

@Injectable({
    providedIn: "root",
})
export class UserFormController implements OnInit, OnChanges {
    userSelectedControl: IUser = {} as IUser;

    private readonly _fb = inject(FormBuilder);

    userForm: FormGroup = {} as FormGroup;

    ngOnInit(): void {}

    ngOnChanges(changes: SimpleChanges): void {
        this.createUserFormGroup();
        this.getGeneralInformations();
        console.log(this.userForm.getRawValue());
    }

    createUserFormGroup() {
        this.userForm = this._fb.group({
            generalInformations: this._fb.group({
                name: ["", Validators.required],
                email: ["", [Validators.required]],
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

    createPhoneList(phoneList: PhoneList) {
        return phoneList.forEach((phone) => this._fb.group({
            type: [null],
            number: [null],
        }));
    }

    getGeneralInformations() {
        this.generalInformations.patchValue(this.userSelectedControl); 
    }

    get generalInformations(): FormGroup {
        return this.userForm.get("generalInformatios") as FormGroup;
    }
}