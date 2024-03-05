import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountComponent } from './account.component';
import {  ReactiveFormsModule } from '@angular/forms';
import { AccountUpdateComponent } from './account-update/account-update.component';
import { AccountViewComponent } from './account-view/account-view.component';
import { MakeTransactionComponent } from './make-transaction/make-transaction.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  declarations: [AccountComponent,AccountUpdateComponent,AccountViewComponent,MakeTransactionComponent]
})
export class AccountModule { }
