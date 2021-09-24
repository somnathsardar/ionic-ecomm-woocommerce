import { NgModule } from '@angular/core';
import { FormatMoneyPipe } from './money/format-money.pipe';
import { CurrencyPipe } from './currency/currency.pipe';

@NgModule({
  declarations: [FormatMoneyPipe, CurrencyPipe],
  imports: [],
  exports: [FormatMoneyPipe, CurrencyPipe],
})

export class PipesModule {}