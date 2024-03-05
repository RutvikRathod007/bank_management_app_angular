import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionComponent } from './transaction.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ViewTransactionsComponent } from './view-transactions/view-transactions.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  declarations: [TransactionComponent,ViewTransactionsComponent]
})
export class TransactionModule { }
