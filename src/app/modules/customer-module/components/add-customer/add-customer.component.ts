import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomerServicesService } from '../../services/customer-services.service';
import { NgToastService } from 'ng-angular-popup';
import {  Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrl: './add-customer.component.css',
})
export class AddCustomerComponent {
  constructor(
    private router:Router,
    private customerService: CustomerServicesService,
    private addCustomerFormRef: MatDialogRef<AddCustomerComponent>,
    private toast: NgToastService)
    {}


  customerImage?: File;

  accountOpenForm = new FormGroup({
    firstName: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
      Validators.pattern(/^[a-zA-Z]+$/),
    ]),
    lastName: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
      Validators.pattern(/^[a-zA-Z]+$/),
    ]),
    dob: new FormControl('1990-01-01',
    Validators.required),

    mobileNumber: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[6-9]{1}[0-9]{9,9}$/),
    ]),

    city: new FormControl('',
    [Validators.required]),

    amount: new FormControl(100, [
      Validators.required,
      Validators.min(100),
      Validators.pattern(/^[1-9]{1}[0-9]*$/),
    ]),

    accountType: new FormControl('saving',
    Validators.required),

    customerImage: new FormControl('',
    Validators.required),
  });

  onSubmit() {
    let formData: FormData = new FormData();

    if (this.customerImage != null) {
      if (this.accountOpenForm.valid) {
        let data = this.accountOpenForm.value;
        formData.append('customerImage', this.customerImage);
        formData.append('firstName', data.firstName ?? '');
        formData.append('lastName', data.lastName ?? '');
        formData.append('dob', data.dob ?? '');
        formData.append('mobileNumber', data.mobileNumber ?? '');
        formData.append('city', data.city ?? '');
        formData.append('accountType', data.accountType ?? '');
        formData.append('amount', data.amount?.toString() ?? '');

        this.customerService.postCustomer(formData).subscribe({
          next: (res) => {
            if (res.success)
              this.toast.success({
                detail: 'success msg',
                summary: res.message??"customer added sucessfully",
                duration: 2000,
                position: 'bottomRight',
              });
              this.addCustomerFormRef.close()
   this.router.navigate(["/all-customers"])
          },
          error: (err) => {
   console.log(err)
            this.toast.error(
              {
                detail:"Error",
               summary:err.error,
               position:'bottomRight'
              }
            );
          },
        });
      }
    }
  }
  closeAddCustomerForm()
  {
  this.addCustomerFormRef.close()
  }
  get getFormControls() {
    return this.accountOpenForm.controls;
  }
  onFileInput(event: any) {
    this.customerImage = event.target.files[0];
    console.log(this.customerImage);
  }
}
