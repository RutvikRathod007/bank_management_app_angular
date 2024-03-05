import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginModel } from './loginModel';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {

  showLoader:boolean=false
  constructor(private authServices: AuthService) {

  }
  loginForm = new FormGroup({
    mobileNumber: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[6-9]{1}[0-9]{9,9}$/),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
  });
  onSubmit() {
    this.showLoader=true
    let loginFormControlls = this.loginForm.controls;
    let userLoginData = new LoginModel(
      loginFormControlls.mobileNumber.value ?? '',
      loginFormControlls.password.value ?? ''
    );
    console.log(userLoginData)
   this.authServices.loginUser(userLoginData);


     if(this.authServices.isLoggedIn==true) this.showLoader=false

   
  }
  get getFormControls() {
    return this.loginForm.controls;
  }
}
