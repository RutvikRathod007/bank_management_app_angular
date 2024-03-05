import { IResponse } from '../../../models/Response';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  baseUrl="http://localhost:5257/api/Transactions"
  constructor(private http:HttpClient) {

  }
  getAllTransactions()
  {
    return this.http.get<IResponse>(`${this.baseUrl}/getAllTransactions`);
  }
  getAllTransactionsByCustomerId(customerId:string)
  {
    return this.http.get<IResponse>(`${this.baseUrl}/getTransactionsByCustomerId/${customerId}`);
  }
}
