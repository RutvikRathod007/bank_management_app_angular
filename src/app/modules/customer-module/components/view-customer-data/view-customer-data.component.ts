import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Customer } from '../../models/Customer';
import { CustomerServicesService } from '../../services/customer-services.service';
import {Component,OnInit, ViewChild} from '@angular/core';
import {  Router } from '@angular/router';
import { AddCustomerComponent } from '../add-customer/add-customer.component';



@Component({
  selector: 'app-view-customer-data',
  templateUrl: './view-customer-data.component.html',
  styleUrl: './view-customer-data.component.css',
})
export class ViewCustomerDataComponent implements OnInit {

  constructor(
    private customerServices: CustomerServicesService,
    private router: Router,
    private dialog:MatDialog
  ){}
  showCustomerUpdateComponent: boolean = false;
  customerToUpdateProp!: Customer;
  currentPage = 1;
  pageSize = 6;
  addCustomerFormDialogRef!:MatDialogRef<AddCustomerComponent>
  totalData!:number
  customers:Customer[]=[]
  searchText:string=''
  showNoDataText=false
 @ViewChild('searchInputBox')

  get totalPages(): number {
    return Math.ceil(this.totalData / this.pageSize);
  }

  showEditCustomersForm(customer: Customer) {
    this.customerToUpdateProp = customer;
    this.showCustomerUpdateComponent = true;
  }
  closeEditCustomerForm() {
    this.showCustomerUpdateComponent = false;
  }
  onCustomerUpdate() {
    this.loadCustomerData(this.currentPage,this.pageSize);
    this.showCustomerUpdateComponent = false;
  }
  goToAccountDetails(custId: string) {
    this.router.navigate(['/all-accounts', { customerId: custId }]);
  }

  get pages(): number[] {
    const pageCount = this.totalPages;
    return Array.from({ length: pageCount }, (_, i) => i + 1);
  }

  setPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      if(this.searchText==='')
      this.loadCustomerData(this.currentPage,this.pageSize)
    else
    this.loadFilteredData()
    }
  }
  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.setPage(this.currentPage)
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.setPage(this.currentPage)

    }
  }

  loadCustomerData(pageNumber:number,pageSize:number) {
    this.customerServices.getCustomers(pageNumber,pageSize).subscribe({next:(res)=>{
      this.customers=res.data
      if(this.customers.length===0)
      this.showNoDataText=true
    else this.showNoDataText=false
      this.totalData=Number.parseInt(res.message??'0')
      this.customers.map((val) =>
       {
      val.customerImage = `http://localhost:5257/api/Customer/getCustomerImage/${val.customerId}?${new Date().getTime()}`;});
     }})
    }

  ngOnInit(): void {
   this.loadCustomerData(this.currentPage,this.pageSize);
  }

  showAddCustomerFormDialog() {
    let addCustomerForm = this.dialog.open(AddCustomerComponent, {
      width: '60vw',
      height:'80vh',

    });
    this.addCustomerFormDialogRef=addCustomerForm
  }
  OnInputChange(e:any)
  {
    this.searchText=e.target.value
    if(this.searchText==='')
    this.loadCustomerData(this.currentPage,this.pageSize)
  }
  loadFilteredData()
  {
   this.customerServices.getFilteredCustomers(this.pageSize,this.currentPage,this.searchText).subscribe({
    next:(res)=>{

    this.customers=res.data
    if(this.customers.length===0)
     this.showNoDataText=true
    this.totalData=Number.parseInt(res.message??'0')
    this.customers.map((val) =>
     {
    val.customerImage = `http://localhost:5257/api/Customer/getCustomerImage/${val.customerId}?${new Date().getTime()}`;});

    },
    error:(err)=>{
      console.log(err)
    }
   })
  }
}
