import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'byEGP'
})
export class ByEGPPipe implements PipeTransform {

  transform(value:number): number {
    return value*15;
  }

}
