import { Component, Input, OnInit, Output } from '@angular/core';
import { Converted } from '../../model/converted.model';
import { FinancesService } from '../service/finances.service';

@Component({
  selector: 'app-conversions',
  templateUrl: './conversions.component.html',
  styleUrl: './conversions.component.css'
})
export class ConversionsComponent implements OnInit {

  @Input() conversions: Converted[] = [];

  constructor(private financesService: FinancesService) { }

  ngOnInit(): void {
    this.financesService.fetchConversionsHistory()
      .subscribe((resp: Converted[]) => {
        this.conversions = resp;
      });
  }
}
