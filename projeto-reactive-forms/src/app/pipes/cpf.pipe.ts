import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: "cpf",
})
export class CpfPipe implements PipeTransform {

    transform(cpfResponse: number): string {

        const cpf = cpfResponse.toString();

        const cpfHiden = `XXX.${cpf.substring(3, 6)}.${cpf.substring(6, 9)}-XX`;

        return cpfHiden;
    }
}