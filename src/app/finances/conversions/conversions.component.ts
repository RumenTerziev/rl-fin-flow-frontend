import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Converted } from '../../model/converted.model';
import { FinancesService } from '../service/finances.service';
import { PageResult } from '../../model/page-result.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-conversions',
  templateUrl: './conversions.component.html',
  styleUrl: './conversions.component.css'
})
export class ConversionsComponent implements OnInit, OnDestroy {

  private pageResultSub: Subscription;

  page: number = 1;
  totalRecords: number = 0;
  disablePreviousPage: boolean = true;
  disableNextPage: boolean = true;

  @Input() conversions: Converted[] = [];

  constructor(private financesService: FinancesService) { }

  ngOnInit(): void {
    this.pageResultSub = this.financesService.pageResult.subscribe(page => {
      if (page !== null) {
        this.totalRecords = page.totalRecords;
        this.conversions = page.items;
        this.updateNextAndPreviousPageButtons();
      }
    });
    this.fetchConversions(this.page);
  }

  ngOnDestroy(): void {
    if (this.pageResultSub) {
      this.pageResultSub.unsubscribe();
    }
  }

  fetchConversions(page: number) {
    this.financesService.fetchConversionsHistory(page - 1)
      .subscribe((resp: PageResult) => {
        this.conversions = resp.items;
        this.totalRecords = resp.totalRecords;
        this.updateNextAndPreviousPageButtons();
      });
  }

  nextPage() {
    if (this.totalRecords > this.page * 5) {
      this.page++;
      this.fetchConversions(this.page);
    }
  }

  previousPage() {
    if (this.page - 1 > 0) {
      this.page--;
      this.fetchConversions(this.page);
    }
  }

  updateNextAndPreviousPageButtons() {
    this.disableNextPage = this.totalRecords <= this.page * 5;
    this.disablePreviousPage = this.page - 1 <= 0;
  }
}
