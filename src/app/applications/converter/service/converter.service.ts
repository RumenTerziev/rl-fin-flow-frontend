import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { Converted } from '../../../model/converted.model';
import { Convert } from '../../../model/convert.model';
import { PageResult } from '../../../model/page-result.model';

@Injectable()
export class ConverterService {
  pageResult = new BehaviorSubject<PageResult>(null);

  constructor(private http: HttpClient) {}

  fetchConversionsHistory(page: number) {
    const conversionsUrl = `/api/v1/converter/conversions/mine?page=${page}`;
    return this.http.get(conversionsUrl).pipe(
      map((response: PageResult) => {
        const pageResult = response;
        this.pageResult.next(pageResult);
        return pageResult;
      })
    );
  }

  convertCurrency(fromCurrency: string, toCurrency: string, amount: number) {
    const url = '/api/v1/converter';

    const convertRequest: Convert = {
      fromCurrency: fromCurrency,
      toCurrency: toCurrency,
      amount: amount,
    };

    return this.http.post(url, convertRequest).pipe(
      map((response: Converted) => {
        const converted = {
          fromCurrency: response.fromCurrency,
          toCurrency: response.toCurrency,
          amount: response.amount,
          resultSum: response.resultSum,
          currencyRate: response.currencyRate,
        };
        return converted;
      })
    );
  }
}
