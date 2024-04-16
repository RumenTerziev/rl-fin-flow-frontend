import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { map } from 'rxjs';
import { Converted } from '../model/converted.model';
import { Convert } from '../model/convert.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-finances',
  templateUrl: './finances.component.html',
  styleUrl: './finances.component.css'
})
export class FinancesComponent implements OnInit {

  ngOnInit(): void {
    this.isHidden = true;
  }

  @ViewChild('convertForm') convertForm: NgForm;

  baseCurrency: string;
  currencyToConvertTo: string;
  sumToConvert: number;
  resultSum: number;
  isHidden: boolean;

  constructor(private http: HttpClient, private router: Router) { }

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
      .subscribe(
        {
          next: (resp: Converted) => {
            this.resultSum = parseFloat(resp.resultSum.toFixed(4));
            this.isHidden = false;
          },
          error: (e) => {
            console.error(e);
            alert('You are not logged in!');
            this.router.navigate(['/login']);
          },
          complete: () => console.info('complete')
        });
    this.convertForm.reset();
  }
}
