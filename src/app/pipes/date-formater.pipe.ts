import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFormater'
})
export class DateFormaterPipe implements PipeTransform {

  transform(value: string, ...args: string[]): string {
    return value.split("T")[0];
  }

}
