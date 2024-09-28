import { Pipe, PipeTransform } from '@angular/core';
import { MaritalStatusEnum } from '../enums/marital-status.enum';

@Pipe({
  name: 'maritalStatus'
})
export class MaritalStatusPipe implements PipeTransform {

  transform(maritalStatusType: number): string {
    const maritalStatus: {[key in MaritalStatusEnum]: string} = {
      [MaritalStatusEnum.SINGLE]: "Solteiro",
      [MaritalStatusEnum.MARRIED]: "Casado",
      [MaritalStatusEnum.DIVORCED]: "Divorciado",
    }

    return maritalStatus[maritalStatusType as MaritalStatusEnum];
  }
}