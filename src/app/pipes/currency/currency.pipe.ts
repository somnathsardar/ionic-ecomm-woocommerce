import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currency'
})
export class CurrencyPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    var parser = new DOMParser();
    var doc = parser.parseFromString(value, 'text/html');
    return doc.body.getElementsByClassName('woocommerce-Price-currencySymbol')[0].innerHTML;
  }

}
