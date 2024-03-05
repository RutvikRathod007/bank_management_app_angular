import { IAccount } from './../models/Account';
import { MakeTransactionComponent } from '../make-transaction/make-transaction.component';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-account-view',
  templateUrl: './account-view.component.html',
  styleUrl: './account-view.component.css',
})
export class AccountViewComponent implements OnInit {
  accounts: IAccount[] = [];
  currentPage = 1;
  pageSize = 7;
  accountNumber: string = '';
  showEditAccountFormPopup: boolean = false;
  accountToUpdateProp!: IAccount;
  updateFormDialog!: MatDialogRef<MakeTransactionComponent>;
  @ViewChild('transactionType') transactionType!: ElementRef;

  constructor(
    private accountServices: AccountService,
    private activatedRoutes: ActivatedRoute,
    private dialog: MatDialog,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.activatedRoutes.params.subscribe((data) => {
      this.accountNumber = data['customerId'];
      if (this.accountNumber !== undefined)
        this.loadAccount(this.accountNumber);
      else this.loadAccounts();
    });
  }

  get totalPages(): number {
    return Math.ceil(this.accounts.length / this.pageSize);
  }
  get pages(): number[] {
    const pageCount = this.totalPages;
    return Array.from({ length: pageCount }, (_, i) => i + 1);
  }

  setPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }
  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }
  loadAccounts() {
    this.accountServices.getAllAccounts().subscribe({
      next: (res) => {
        this.accounts = res.data;
      },
      error: (err) => console.log(err),
    });
  }
  loadAccount(accNum: string) {
    this.accountServices.getAccount(accNum).subscribe({
      next: (res) => {
        this.accounts[0] = res.data;
        console.log(res);
      },
      error: (err) => console.log(err),
    });
  }
  showAllTransactionsByCustomerId(customerId: string) {
    this.router.navigate(['/all-transactions', { customerId }]);
  }
  showEditAccountDialog(account: IAccount) {
    this.accountToUpdateProp = account;
    this.showEditAccountFormPopup = true;
  }
  showDepositeAmountDialog(accNum: string) {
    let updateFormDialog = this.dialog.open(MakeTransactionComponent, {
      width: '40vw',
      data: accNum,
    });
    updateFormDialog.afterClosed().subscribe((data) => {
      console.log('data is', data);
      if (data.status && this.accountNumber === undefined) this.loadAccounts();
      else this.loadAccount(this.accountNumber);
    });
  }

  closeEditAccountFormPopup() {
    this.showEditAccountFormPopup = false;
  }
  onAccountUpdate() {
    this.loadAccounts();
  }
}
