import { Component, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Converted } from '../model/converted.model';
import { Router } from '@angular/router';
import { FinancesService } from './service/finances.service';
import { PageResult } from '../model/page-result.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-finances',
  templateUrl: './finances.component.html',
  styleUrl: './finances.component.css'
})
export class FinancesComponent implements OnInit {

  ngOnInit(): void {
    this.isHidden = true;
    this.financesService.fetchConversionsHistory(0);
  }

  @ViewChild('convertForm') convertForm: NgForm;
  private pageResultSub: Subscription;
  conversions: Converted[] = [];
  totalRecords: number;

  baseCurrency: string;
  currencyToConvertTo: string;
  sumToConvert: number;
  resultSum: number;
  isHidden: boolean;

  constructor(private financesService: FinancesService, private router: Router) { }

  onConvertRequest() {
    this.baseCurrency = this.convertForm.value.baseCurrency;
    this.currencyToConvertTo = this.convertForm.value.currencyToConvertTo;
    this.sumToConvert = this.convertForm.value.sumToConvert;

    this.financesService.convertCurrency(this.baseCurrency, this.currencyToConvertTo, this.sumToConvert)
      .subscribe(
        {
          next: (resp: Converted) => {
            this.resultSum = parseFloat(resp.resultSum.toFixed(4));
            this.isHidden = false;
            this.financesService.fetchConversionsHistory(0)
              .subscribe((resp: PageResult) => {
                this.conversions = resp.items;
                this.totalRecords = resp.totalRecords;
              });
            this.pageResultSub = this.financesService.pageResult.subscribe(page => {
              page !== null;
            });
          },
          error: (e) => {
            console.error(e);
            alert('You are not logged in!');
            this.router.navigate(['/login']);
          },
          complete: () => console.info('complete')
        });
  }
}
