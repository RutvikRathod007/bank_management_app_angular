import { IAccount } from './../../account/models/Account';
import { IResponse } from './../../../models/Response';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Transfer } from '../../account/models/Transfer';
import { Transaction } from '../../account/models/Transaction';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  baseUrl = 'http://localhost:5257/api/Accounts';
  constructor(private http: HttpClient) {}
  getAllAccounts(): Observable<IResponse> {
    return this.http.get<IResponse>(`${this.baseUrl}/getAllAccounts`);
  }

  getAccount(custID: string) {
    return this.http.get<IResponse>(
      `${this.baseUrl}/getAccountByCustId/${custID}`
    );
  }
  updateAccount(acc: IAccount) {
    return this.http.put<IResponse>(`${this.baseUrl}/updateAccount`, acc);
  }
  deposite(data: Transaction) {
    return this.http.post<IResponse>(`${this.baseUrl}/depositeMoney`, data);
  }
  withdraw(data: Transaction) {
    return this.http.post<IResponse>(`${this.baseUrl}/withdrawMoney`, data);
  }
  transfer(data: Transfer) {
    console.log('getting req');
    return this.http.post<IResponse>(`${this.baseUrl}/transferMoney`, data);
  }
}
