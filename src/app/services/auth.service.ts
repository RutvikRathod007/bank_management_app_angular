import { IResponse } from '../models/Response';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { LoginModel } from '../components/login/loginModel';
import { RegisterModel } from '../components/register/registerModel';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedIn!: boolean;
  user!:any
  baseUrl = 'http://localhost:5257/api/auth';
  authEvent: EventEmitter<boolean> = new EventEmitter<boolean>();
  constructor(
    private http: HttpClient,
    private toast: NgToastService,
    private router: Router
  ) {
    let user = localStorage.getItem('user');
    if (user !== null)
    {
      this.isLoggedIn=true;
      this.user=JSON.parse(user)
    }

  }

  registerUser(userSignUpDetails: RegisterModel) {
    return this.http
      .post<IResponse>(`${this.baseUrl}/register`, userSignUpDetails)
      .subscribe({
        next: (res) => {
          this.toast.success({
            detail: 'Success',
            summary: 'registration suceess',
            position: 'bottomRight',
          });
        },
        error: (err) => {
          this.toast.error({
            detail: 'Error',
            summary: 'registration error',
            position: 'bottomRight',
          });
        },
      });
  }
 handleError(error:HttpErrorResponse)
{
if(error.error instanceof ErrorEvent)
{
  console.error('ERROR OCCURED',error.error)
}
else{

 console.error('ERROR OCCURED else',error)
}
return throwError('Server down')
}
  loginUser(userLoginDetails: LoginModel) {
    return this.http
      .post<IResponse>(`${this.baseUrl}/login`, userLoginDetails)
      .pipe(catchError(this.handleError))
      .subscribe({
        next: (res) => {
          console.log(res)
         if(res.success)
         {
          this.toast.success({
            detail: 'Success',
            summary: 'Login Success',
            duration: 2000,
            position: 'bottomRight',
          });
          this.isLoggedIn = true;
          this.setUserToLocalStorage(res);
          this.authEvent.emit(true);
          this.router.navigate(['/']);
          return true
         }
         else{
          this.toast.error({
            detail: 'Unauthorized',
            summary: 'Invalid credentials',
            duration: 2000,
            position: 'bottomRight',
          });
          return false;
         }

        },
        error: (err) => {

          this.toast.error({
            detail: 'Error',
            summary: err,
            duration: 2000,
            position: 'bottomRight',
          });
        },
      })
  }
  setUserToLocalStorage(user: any) {
    localStorage.setItem('user', JSON.stringify(user));
  }
  getUserFromLocalStorage(): any {
    let user = localStorage.getItem('user');
    if (user !== null) return JSON.parse(user);
    return null;
  }

  logout() {
    localStorage.removeItem('user');
    this.isLoggedIn = false;
    this.authEvent.emit(false);
  }

  isAuthenticatedUser() {
    return this.isLoggedIn;
  }
}
