import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn } from "@angular/forms";

export const requiredAddressValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const addressGroup = control as FormGroup;

    const addressToCheck = Object.keys(addressGroup.value).filter((addressName: string) => addressName !== "type" && addressName !== "typeDescription");

    const HAS_ANY_TEXT = addressToCheck.some((addressName: string) => isControlDirty(addressGroup.get(addressName) as FormControl));

    for (const addressName of addressToCheck) {
        const controlName = addressGroup.get(addressName);

        if (HAS_ANY_TEXT) {
            if (!controlName?.value) {
                controlName?.setErrors({ addressRequiredErrorr: true });
                controlName?.markAsTouched();
            } else {
                controlName?.setErrors(null);
            }
        } else {
            controlName?.setErrors(null);
        }
    };

    return null;
}

const isControlDirty = (control: FormControl): boolean => {
    return !!control && control.value && control.value.toString().trim().length > 0;
}