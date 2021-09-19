import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatMoney'
})
export class FormatMoneyPipe implements PipeTransform {

  transform(value: any, ...args: any []): any {
    return value.replaceAll('ins', 'span').replaceAll('woocommerce-Price-amount', '').replaceAll('woocommerce-Price-currencySymbol', 'product-currencySymbol');
  }

}
