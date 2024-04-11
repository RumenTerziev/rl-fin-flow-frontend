import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { catchError, map } from 'rxjs';
import { Converted } from '../model/converted.model';
import { Convert } from '../model/convert.model';

@Component({
  selector: 'app-finances',
  templateUrl: './finances.component.html',
  styleUrl: './finances.component.css'
})
export class FinancesComponent {

  @ViewChild('convertForm') convertForm: NgForm;

  baseCurrency: string;
  currencyToConvertTo: string;
  sumToConvert: string;
  resultSum: string;

  constructor(private http: HttpClient) { }

  convert() {
    this.baseCurrency = this.convertForm.value.baseCurrency;
    this.currencyToConvertTo = this.convertForm.value.currencyToConvertTo;
    this.sumToConvert = this.convertForm.value.sumToConvert;
    const url = '/api/v1/finances/converter';

    const convertRequest: Convert = {
      baseCurrency: this.baseCurrency,
      currencyToConvertTo: this.currencyToConvertTo,
      sumToConvert: this.sumToConvert
    };

    this.http.post(url, convertRequest)
      .pipe(
        map((response: Converted) => {
          const converted = {
            baseCurrency: response.baseCurrency,
            currencyToConvertTo: response.currencyToConvertTo,
            sumToConvert: response.sumToConvert,
            resultSum: response.resultSum
          };
          return converted;
        })
      )
      .subscribe((resp) => {
        this.resultSum = resp.resultSum;
        console.log(resp);
      });
    this.convertForm.reset();
  }
}
