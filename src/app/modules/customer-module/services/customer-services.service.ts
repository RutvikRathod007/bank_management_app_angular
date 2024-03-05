import { IResponse } from './../../../models/Response';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CustomerModuleModule } from '../customer-module.module';
@Injectable({ providedIn: CustomerModuleModule })

export class CustomerServicesService {
  baseUrl = 'http://localhost:5257/api/Customer';
  constructor(private http: HttpClient) {}

  getCustomers(pageSize:number,pageNumber:number):Observable<IResponse> {
    return  this.http.get<IResponse>(`${this.baseUrl}/getCustomerByPagination?pageNumber=${pageNumber}&pageSize=${pageSize}`);
  }
  getFilteredCustomers(pageSize:number,pageNumber:number, serachText:string):Observable<IResponse> {
    return  this.http.get<IResponse>(`${this.baseUrl}/filterCustomerByName?pageNumber=${pageNumber}&pageSize=${pageSize}&searchText=${serachText}`);
  }
  postCustomer(customer: FormData): Observable<IResponse> {
    return this.http.post<IResponse>(`${this.baseUrl}/addCustomer`, customer);
  }
  updateCustomer(customer: FormData) {
    return this.http.put<IResponse>(`${this.baseUrl}/updateCustomer`, customer);
  }

 getCustomerImage()
 {

 }
}
