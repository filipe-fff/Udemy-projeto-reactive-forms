import { Pipe, PipeTransform } from "@angular/core";
import { PhoneTypeEnum } from "../enums/phone-type.enum";

@Pipe({
    name: "phonePlaceholder",
})
export class PhonePlaceholderPipe implements PipeTransform {

    transform(phone: number): string {
        
        const phoneType: {[key in PhoneTypeEnum] : string} = {
            [PhoneTypeEnum.RESIDENTIAL]: "+55 51 12312-3123",
            [PhoneTypeEnum.PHONE]: "+55 51 1231-2312",
            [PhoneTypeEnum.EMERGENCY]: "+55 51 12312-3123 ou +55 51 1231-2312"
        }

        return phoneType[phone as PhoneTypeEnum];
    }
}