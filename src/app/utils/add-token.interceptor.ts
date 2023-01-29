import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Route, Router } from '@angular/router';

@Injectable()
export class AddTokenInterceptor implements HttpInterceptor {
   
  
  constructor(private router: Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = localStorage.getItem('token')
   
    if(token){
      request = request.clone({setHeaders: {authorization: `Bearer ${token}`}})
    }


    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse)=>{
        if(error.status == 404 ){
          this.router.navigate(['/iniciar-sesion'])
        }

        return throwError(() => new Error())
      })
      )
  }
}
