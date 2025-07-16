import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConverterComponent } from './converter.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ConversionsComponent } from './conversions/conversions.component';
import { ConverterService } from './service/converter.service';

@NgModule({
  declarations: [ConverterComponent, ConversionsComponent],
  imports: [CommonModule, FormsModule, HttpClientModule],
  providers: [ConverterService],
})
export class ConverterModule {}
