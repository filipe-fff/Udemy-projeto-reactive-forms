import { Pipe, PipeTransform } from "@angular/core";
import { PhoneTypeEnum } from "../enums/phone-type.enum";

@Pipe({
    name: "phoneMask",
})
export class PhoneMaskPipe implements PipeTransform {

    transform(type: number): string {
        
        const phonesMask: {[key in PhoneTypeEnum]: string} = {
            [PhoneTypeEnum.RESIDENTIAL]: "+00 00 0000-0000",
            [PhoneTypeEnum.PHONE]: "+00 00 00000-0000",
            [PhoneTypeEnum.EMERGENCY]: "+00 00 0000-0000||+00 00 00000-0000",
        }

        return phonesMask[type as PhoneTypeEnum];
    }
}