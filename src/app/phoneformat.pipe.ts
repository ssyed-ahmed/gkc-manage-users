import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'phoneFormat'})
export class PhoneFormat implements PipeTransform {

    transform(value: number) {
        let out = '';
        let valueStr = value + '';
        let first =  valueStr.substring(0, 3);
        let second = valueStr.substring(3, 6);
        let third = valueStr.substring(6, valueStr.length);
        out = first + '-' + second + '-' + third;

        return out;
    }
}