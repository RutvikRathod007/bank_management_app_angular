import { Customer, ICustomer } from '../../models/Customer';
import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomerServicesService } from '../../services/customer-services.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-update-customer',
  templateUrl: './update-customer.component.html',
  styleUrl: './update-customer.component.css',
})
export class UpdateCustomerComponent implements OnInit {
  @Input()
  customerToUpdate!: Customer;

  @ViewChild('fileInput') myImageInput!: ElementRef;
  @Output()
  closeModel: EventEmitter<void> = new EventEmitter<void>();
  @Output()
  loadCustomerData: EventEmitter<void> = new EventEmitter<void>();
  customerImage?: File;

  onCloseBtnClick() {
    this.closeModel.emit();
  }

  updateCustForm = new FormGroup({
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
    dob: new FormControl('1990-01-01', Validators.required),
    mobileNumber: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[6-9]{1}[0-9]{9,9}$/),
    ]),
    city: new FormControl('', [Validators.required]),
    customerImage: new FormControl(''),
  });
  constructor(
    private customerService: CustomerServicesService,
    private toast: NgToastService
  ) {


  }
  setFormData(customer: Customer) {
    this.updateCustForm.controls.lastName.setValue(customer.lastName);
    this.updateCustForm.controls.firstName.setValue(customer.firstName);
    this.updateCustForm.controls.city.setValue(customer.city);
    this.updateCustForm.controls.dob.setValue(customer.dob.split('T')[0]);
    this.updateCustForm.controls.mobileNumber.setValue(customer.mobileNumber);
  }
  ngOnInit(): void {
    this.setFormData(this.customerToUpdate);
  }
  onSubmit() {
    let formData: FormData = new FormData();

    if (this.updateCustForm.valid) {
      let data = this.updateCustForm.value;
      formData.append(
        'customerId',
        this.customerToUpdate.customerId.toString()
        );
        if (this.customerImage != null)
        formData.append('customerImage', this.customerImage);
        formData.append('firstName', data.firstName ?? '');
        formData.append('lastName', data.lastName ?? '');
        formData.append('dob', data.dob ?? '');
        formData.append('mobileNumber', data.mobileNumber ?? '');
        formData.append('city', data.city ?? '');

        this.customerService.updateCustomer(formData).subscribe({
          next: (res) => {
            console.log(res)
           if(res.success)
           {
            this.toast.success({
              detail: 'success msg',
              summary: 'Customer Updated',
              duration: 2000,
              position: 'bottomRight',
            });
            this.loadCustomerData.emit();
            this.closeModel.emit();
           }




          },
          error: (err) => {console.log(err);
            this.toast.error({
              detail: 'Error',
              summary: err.error.message??"Error",
              duration: 2000,
              position: 'bottomRight',
            });
            this.closeModel.emit();},
        });

        console.log(this.customerToUpdate);
      }


    
  }
  get getFormControls() {
    return this.updateCustForm.controls;
  }
  onFileInput(event: any) {
    this.customerImage = event.target.files[0];
    console.log(this.customerImage);
  }
}
