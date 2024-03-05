import { NotfoundComponent } from './components/notfound/notfound/notfound.component';
import { AccountViewComponent } from './modules/account/account-view/account-view.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCustomerComponent } from './modules/customer-module/components/add-customer/add-customer.component';
import { HomeComponent } from './components/home/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { ViewTransactionsComponent } from './modules/transaction/view-transactions/view-transactions.component';
import { ViewCustomerDataComponent } from './modules/customer-module/components/view-customer-data/view-customer-data.component';
import { RegisterComponent } from './components/register/register.component';
import { authGuard } from './guards/auth.guard';
import { logingaurdGuard } from './guards/logingaurd.guard';
const routes: Routes = [
  {
    path: 'all-customers',
    component: ViewCustomerDataComponent,
    canActivate: [authGuard],
  },
  {
    path: 'add-customer',
    component: AddCustomerComponent,
    canActivate: [authGuard],
  },
  {
    path: '',
    component: HomeComponent,
  },

  {
    path: 'all-accounts',
    component: AccountViewComponent,
    canActivate: [authGuard],
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [logingaurdGuard],
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [logingaurdGuard],
  },

  {
    path: 'all-transactions',
    component: ViewTransactionsComponent,
    canActivate: [authGuard],
  },

  {
    path: '**',
    component: NotfoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
