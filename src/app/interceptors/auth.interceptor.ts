import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { catchError } from 'rxjs';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authservice = inject(AuthService);
  const user = authservice.getUserFromLocalStorage();
  const toast = inject(NgToastService);
  const router = inject(Router);
  let token = '';
  if (user !== null) token = user.token;
  const modifiedReq = req.clone({
    headers: req.headers.set('Authorization', `Bearer ${token}`),
  });
  return next(modifiedReq).pipe(
    catchError((err) => {

      if (err.status === 401) {
        toast.warning({
          detail: 'Unauthorize',
          summary: 'login again to use our app',
          position: 'bottomRight',
        });
        authservice.logout()
        router.navigate(['/login']);
        throw new Error('Token expired');

      }
     if(err.status===0)
     {
      toast.error({ detail: 'Error', summary: 'Server not responding' });

        throw new Error('Server Down');
     }
  throw new Error('Token expired');
    })
  );
};
