import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FinancesComponent } from './finances.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ConversionsComponent } from './conversions/conversions.component';
import { FinancesService } from './service/finances.service';

@NgModule({
  declarations: [
    FinancesComponent,
    ConversionsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    FinancesService
  ]
})
export class FinancesModule { }
