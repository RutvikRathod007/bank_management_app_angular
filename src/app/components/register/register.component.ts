import { Component } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { RegisterCustModel } from './registerModel';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  constructor(private authServices: AuthService,private router:Router,private toast:NgToastService) {}

  registerForm = new FormGroup({
    userName: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.pattern(/^[a-zA-Z]+$/),
    ]),
    mobileNumber: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[6-9]{1}[0-9]{9,9}$/),
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z]+\.[a-zA-Z]{2,}$/),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
  });
  onSubmit() {
    if (this.registerForm.valid) {
      let formControls = this.registerForm.controls;
      let userSignUpData = new RegisterCustModel(
        formControls.userName.value ?? '',
        formControls.mobileNumber.value ?? '',
        formControls.email.value ?? '',
        formControls.password.value ?? '',
      );
   console.log("registration data:",userSignUpData)
      this.authServices.registerUser(userSignUpData)

    }
  }
  get getFormControls() {
    return this.registerForm.controls;
  }
}
