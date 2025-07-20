import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApplicationsComponent } from './applications.component';
import { ChatAiComponent } from './chat-ai/chat-ai.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConverterModule } from './converter/converter.module';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    ApplicationsComponent,
    ChatAiComponent
  ],
  imports: [
    CommonModule,
    ConverterModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule
  ],
  exports: [ApplicationsComponent, ChatAiComponent]
})
export class ApplicationsModule { }
