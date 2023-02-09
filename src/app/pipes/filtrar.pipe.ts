import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtrar'
})
export class FiltrarPipe implements PipeTransform {

  filterPost = ''
  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
