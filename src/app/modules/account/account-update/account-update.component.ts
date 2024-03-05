import { IAccount } from './../models/Account';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-account-update',
  templateUrl: './account-update.component.html',
  styleUrl: './account-update.component.css',
})
export class AccountUpdateComponent implements OnInit {
  @Component({
    selector: 'app-update-customer',
    templateUrl: './update-customer.component.html',
    styleUrl: './update-customer.component.css',
  })
  @Input()
  accountToUpdate!: IAccount;
  isActive!: boolean;

  @Output()
  closeModel: EventEmitter<void> = new EventEmitter<void>();
  @Output()
  loadCAccountData: EventEmitter<void> = new EventEmitter<void>();

  onCloseBtnClick() {
    this.closeModel.emit();
  }

  updateAccForm = new FormGroup({
    accNum: new FormControl(''),
    accBalance: new FormControl('', [
      Validators.required,
      Validators.min(100),
      Validators.pattern(/^[0-9]+$/),
    ]),
    accType: new FormControl('', [Validators.required]),
    isActive: new FormControl(false, [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
      Validators.pattern(/^[a-zA-Z]+$/),
    ]),
  });
  constructor(
    private accountService: AccountService,
    private toast: NgToastService
  ) {}
  setFormData(account: IAccount) {
    this.updateAccForm.controls.accNum.setValue(account.accNumber.toString());
    this.updateAccForm.controls.accType.setValue(account.accType);
    this.updateAccForm.controls.accBalance.setValue(
      account.accBalance.toString()
    );
    this.updateAccForm.controls.isActive.setValue(account.isActive);
  }
  ngOnInit(): void {
    this.setFormData(this.accountToUpdate);
  }

  onSubmit() {
    if (this.updateAccForm.valid) {
      this.accountToUpdate.accBalance = Number(
        this.updateAccForm.value.accBalance ?? ''
      );
      this.accountToUpdate.accNumber = Number(
        this.updateAccForm.value.accNum ?? ''
      );
      this.accountToUpdate.accType = this.updateAccForm.value.accType ?? '';
      this.accountToUpdate.isActive = Boolean(
        this.updateAccForm.value.isActive ?? ''
      );
      this.accountService.updateAccount(this.accountToUpdate).subscribe({
        next: (res) => {
          console.log('account updated');
          this.toast.success({
            detail: 'success msg',
            summary: 'Account Updated',
            duration: 2000,
            position: 'bottomRight',
          });
          this.loadCAccountData.emit();
          this.closeModel.emit();
        },
        error: (err) => console.log(err),
      });
    }
  }

  get getFormControls() {
    return this.updateAccForm.controls;
  }
}
