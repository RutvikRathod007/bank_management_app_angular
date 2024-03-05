import { ITransaction } from '../models/transaction';
import { Component } from '@angular/core';
import { Customer } from '../../customer-module/models/Customer';
import { TransactionService } from '../services/transaction.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-transactions',
  templateUrl: './view-transactions.component.html',
  styleUrl: './view-transactions.component.css'
})
export class ViewTransactionsComponent {
  transactions: ITransaction[] = [];
  customerToUpdateProp!:Customer
  currentPage = 1;
  accountNumber!:string
  pageSize = 10;
  constructor(private transactionService:TransactionService,private activatedRoutes:ActivatedRoute){}
  get totalPages(): number {
      return Math.ceil(this.transactions.length / this.pageSize);
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

  loadAllTransactions() {
    this.transactionService.getAllTransactions().subscribe((response) => {

      if (response.success) {
        this.transactions = response.data;
      }

    });
  }
  loadAllTransactionsByAccNumber(customerId:string) {
    this.transactionService.getAllTransactionsByCustomerId(customerId).subscribe((response) => {

      if (response.success) {
        this.transactions = response.data;

      }

    });
  }
  ngOnInit(): void {

    this.activatedRoutes.params.subscribe((data) => {
      this.accountNumber = data['customerId'];
      console.log(this.accountNumber)
    if (this.accountNumber !== undefined)
      this.loadAllTransactionsByAccNumber(this.accountNumber);
    else
      this.loadAllTransactions();
    });
  }



}







