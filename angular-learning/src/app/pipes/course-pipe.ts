import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'course',
  standalone: true
})
export class CoursePipe implements PipeTransform {

  transform(value: string): string {

    return value.toUpperCase();

  }

}