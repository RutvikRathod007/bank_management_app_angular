import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewCustomerDataComponent } from './components/view-customer-data/view-customer-data.component';
import { HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http';
import { DateFormaterPipe } from '../../pipes/date-formater.pipe';
import { AddCustomerComponent } from './components/add-customer/add-customer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgToastModule } from 'ng-angular-popup';
import { MatTableModule } from '@angular/material/table';
import {MatPaginatorModule } from '@angular/material/paginator';
import { UpdateCustomerComponent } from './components/update-customer/update-customer.component';
import { authInterceptor } from '../../interceptors/auth.interceptor';


@NgModule({
  declarations: [
    ViewCustomerDataComponent,
    DateFormaterPipe,
    AddCustomerComponent,
    UpdateCustomerComponent,
  ],
  imports: [
    CommonModule,
    MatTableModule,
    HttpClientModule,
    FormsModule,
    MatTooltipModule,
    ReactiveFormsModule,
    NgToastModule,
    MatPaginatorModule
  ],
  exports: [ViewCustomerDataComponent],
  providers: [provideHttpClient(withInterceptors([authInterceptor])),],
})
export class CustomerModuleModule {}
