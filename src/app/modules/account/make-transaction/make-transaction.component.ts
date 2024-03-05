import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AccountUpdateComponent } from '../account-update/account-update.component';
import { Transfer } from '../models/Transfer';
import { Transaction } from '../models/Transaction';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-make-transaction',
  templateUrl: './make-transaction.component.html',
  styleUrl: './make-transaction.component.css',
})
export class MakeTransactionComponent {
  transactionType: string = '';
  depositeForm = new FormGroup({
    accNumFrom: new FormControl(''),
    accNumTo: new FormControl(''),
    amount: new FormControl('', [
      Validators.required,
      Validators.min(100),
      Validators.pattern(/^[0-9]+$/),
    ]),
  });
  constructor(
    private accountService: AccountService,
    private toast: NgToastService,
    private depositeFormref: MatDialogRef<AccountUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string
  ) {}
  ngOnInit(): void {
    this.depositeForm.controls.accNumFrom.setValue(this.data);
  }
  setValidators() {
    this.depositeForm.controls.accNumTo.setValidators([
      Validators.required,
      Validators.pattern(/^[0-9]*$/),
      Validators.minLength(14),
    ]);
  }
  removeValidators() {
    this.depositeForm.controls.accNumTo.clearValidators();
    this.depositeForm.controls.accNumTo.updateValueAndValidity();
  }
  onSubmit() {
    let maxAllowedAmount = 100000000;
    if (this.depositeForm.valid) {
      console.log(this.depositeForm);
      if (
        this.transactionType === 'deposite' ||
        this.transactionType === 'withdraw'
      ) {
        if (
          Number.parseInt(this.depositeForm.value.amount ?? '1') >
          maxAllowedAmount
        ) {
          this.toast.error({
            detail: 'Error',
            summary: 'amount is to much',
            position: 'bottomRight',
          });
          return;
        }

        let transactionData: Transaction = new Transaction(
          this.data,
          Number.parseInt(this.depositeForm.value.amount ?? '')
        );
        if (this.transactionType === 'deposite') {
          this.accountService.deposite(transactionData).subscribe({
            next: (res) => {
              if (res.success) {
                this.toast.success({
                  detail: 'success msg',
                  summary: 'Deposite Success',
                  duration: 2000,
                  position: 'bottomRight',
                });
                this.depositeFormref.close({ status: true });
              }
            },
            error: (err) => {
              console.log('err is', err);
              this.toast.error({
                detail: 'Error',
                summary: 'account inactive',
                duration: 2000,
                position: 'bottomRight',
              });
              this.depositeFormref.close({ status: false });
            },
          });
        } else {
          this.accountService.withdraw(transactionData).subscribe({
            next: (res) => {
              console.log('withdrawed');
              this.toast.success({
                detail: 'success msg',
                summary: 'withdraw Success',
                duration: 2000,
                position: 'bottomRight',
              });
              this.depositeFormref.close({ status: true });
            },
            error: (err) => {
              this.toast.error({
                detail: 'Error',
                summary: err.error.message,
                position: 'bottomRight',
              });
              this.depositeFormref.close({ status: false });
            },
          });
        }
      } else {
        if (
          Number.parseInt(this.depositeForm.value.amount ?? '1') >
          maxAllowedAmount
        ) {
          this.toast.error({
            detail: 'Error',
            summary: 'amount is to much',
            position: 'bottomRight',
          });
          return;
        }
        let transferData = new Transfer(
          this.data,
          Number(this.depositeForm.controls.amount.value),
          this.depositeForm.controls.accNumTo.value ?? ''
        );
        if (transferData.from === transferData.to) {
          this.toast.error({
            detail: 'Error',
            summary: 'account number must be different',
            position: 'bottomRight',
          });
          return;
        }

        this.accountService.transfer(transferData).subscribe({
          next: () => {
            this.toast.success({
              detail: 'success msg',
              summary: 'Transfer Success',
              duration: 2000,
              position: 'bottomRight',
            });
            this.depositeFormref.close({ status: true });
          },

          error: (err) => {
            this.toast.error({
              detail: 'Error',
              summary: err.error.message,
              position: 'bottomRight',
            });
            this.depositeFormref.close({ status: false });
          },
        });
      }
    }
  }
  onChange(e: any) {
    if (e.target.value === 'transfer') {
      this.setValidators();
    } else {
      this.removeValidators();
    }
    this.transactionType = e.target.value;
    console.log(e.target.value);
  }
  get getFormControls() {
    return this.depositeForm.controls;
  }
  onCloseBtnClick() {
    this.depositeFormref.close();
  }
}
