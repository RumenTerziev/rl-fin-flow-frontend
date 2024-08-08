import { Component, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Converted } from '../../model/converted.model';
import { FinancesService } from '../service/finances.service';
import { PageResult } from '../../model/page-result.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-conversions',
  templateUrl: './conversions.component.html',
  styleUrl: './conversions.component.css'
})
export class ConversionsComponent implements OnInit, OnChanges {

  private pageResultSub: Subscription;

  page: number = 1;
  totalRecords: number = 0;
  disablePreviousPage: boolean = true;
  disableNextPage: boolean = true;

  @Input() conversions: Converted[] = [];

  constructor(private financesService: FinancesService) { }

  ngOnInit(): void {
    this.fetchConversions(this.page);
    this.updateNextAndPreviousPageButtons();
    this.pageResultSub = this.financesService.pageResult.subscribe(page => {
      page !== null;
      this.totalRecords = page.totalRecords;
      this.conversions  =page.items;
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.fetchConversions(this.page);
    this.updateNextAndPreviousPageButtons();
  }

  fetchConversions(page: number) {
    this.financesService.fetchConversionsHistory(page - 1)
      .subscribe((resp: PageResult) => {
        this.conversions = resp.items;
        this.totalRecords = resp.totalRecords;
      });
      this.pageResultSub = this.financesService.pageResult.subscribe(page => {
        page !== null;
      });
  }

  nextPage() {
    if (this.totalRecords > this.page * 5) {
      this.page++;
      this.fetchConversions(this.page);
    }
    this.updateNextAndPreviousPageButtons();
  }

  previousPage() {
    if (this.page - 1 <= 0) {
      return;
    }
    this.page--;
    this.fetchConversions(this.page);
    this.updateNextAndPreviousPageButtons();
  }

  updateNextAndPreviousPageButtons() {
    this.disableNextPage = this.totalRecords <= this.page * 5;
    this.disablePreviousPage = this.page - 1 <= 0;
  }
}
