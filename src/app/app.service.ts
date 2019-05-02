import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HomePage } from './home/home.page';
import { ListPage } from './list/list.page';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { ToastController } from '@ionic/angular';

@Injectable({
    providedIn: 'root',
})
export class appService {
    constructor(public toastController: ToastController,private http: HttpClient) { }
    // Define API
    apiURL = 'http://elsawy.tryfcomet.com/api';
    // Http Options
    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    }
    // HttpClient API get() method => Fetch employees list
    getEmployees(uuid): Observable<ListPage> {
        return this.http.get<ListPage>(this.apiURL + '/article_uuid/' + uuid)
            .pipe(
                retry(1),
                catchError(this.handleError),
            )
    }
    // // HttpClient API delete() method => Delete employee
    deleteEmployee(id) {
        console.log(id);
        return this.http.delete<ListPage>(this.apiURL + '/article/' + id)
            .pipe(
                retry(1),
                catchError(this.handleError)
            )
    }
      // HttpClient API post() method => Create employee
       createEmployee(employee): Observable<HomePage> {
    return this.http.post<HomePage>(this.apiURL + '/article', JSON.stringify(employee), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError),


      
    )
  }  

    // Error handling 
     handleError(error) {
        let errorMessage = '';
        let errCode = '';
        if (error.error instanceof ErrorEvent) {
            // Get client-side error
            errorMessage = error.error.message;

            

        } else {
            // Get server-side error
             errorMessage = error.message;
             errCode = 'Error ' + error.status;
        }
        window.alert(errCode);
        //alert(errorMessage);
        return throwError(errorMessage);
    }
}