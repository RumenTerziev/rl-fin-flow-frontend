import { Component, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Converted } from '../model/converted.model';
import { Router } from '@angular/router';
import { ConverterService } from './service/converter.service';
import { PageResult } from '../model/page-result.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.css'],
})
export class ConverterComponent implements OnInit {
  ngOnInit(): void {
    this.isHidden = true;
    this.converterService.fetchConversionsHistory(0);
  }

  @ViewChild('convertForm') convertForm: NgForm;
  private pageResultSub: Subscription;
  conversions: Converted[] = [];
  totalRecords: number;

  fromCurrency: string = 'BGN';
  toCurrency: string = 'EUR';
  amount: number = 1;
  resultSum: number;
  isHidden: boolean;

  constructor(
    private converterService: ConverterService,
    private router: Router
  ) {}

  onConvertRequest() {
    this.fromCurrency = this.convertForm.value.fromCurrency;
    this.toCurrency = this.convertForm.value.toCurrency;
    this.amount = this.convertForm.value.amount;

    this.converterService
      .convertCurrency(this.fromCurrency, this.toCurrency, this.amount)
      .subscribe({
        next: (resp: Converted) => {
          this.resultSum = parseFloat(resp.resultSum.toFixed(4));
          this.isHidden = false;
          this.converterService
            .fetchConversionsHistory(0)
            .subscribe((resp: PageResult) => {
              this.conversions = resp.items;
              this.totalRecords = resp.totalRecords;
            });
          this.pageResultSub = this.converterService.pageResult.subscribe(
            (page) => {
              page !== null;
            }
          );
        },
        error: (e) => {
          console.error(e);
          alert(
            'Something went wrong! Please review your input and try again!'
          );
          this.router.navigate(['/login']);
        },
        complete: () => console.info('complete'),
      });
  }
}
