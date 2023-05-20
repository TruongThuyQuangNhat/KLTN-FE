import { HttpEvent, 
    HttpInterceptor, 
    HttpHandler, 
    HttpRequest, 
    HttpResponse,
    HttpErrorResponse} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})

export class HttpErrorInterceptor implements HttpInterceptor {
    horizontalPosition: MatSnackBarHorizontalPosition = 'start';
    verticalPosition: MatSnackBarVerticalPosition = 'bottom';
    constructor(private _snackBar: MatSnackBar){}
    openSnackBar(content: string) {
        this._snackBar.open(content, 'Đóng', {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
          duration: 5000,
        });
      }

intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
return next.handle(request)
  .pipe(
    catchError( (error: HttpErrorResponse) => { 
       let errMsg = '';
       if(error.error.message){
        errMsg = error.error.message;
        this.openSnackBar(errMsg)
       } else {
        for(let key in error.error.errors){
          errMsg = error.error.errors[key]
         }
         this.openSnackBar(errMsg[0])
       }
       console.log(error)
       return throwError(() => new Error(error.error));
     })
  )
}
}  