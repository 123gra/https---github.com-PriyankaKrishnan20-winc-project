import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { SessionStorageService } from '../session-storage.service';
import { apiLoginURL } from 'src/app/config/api.login';
import { map, catchError } from 'rxjs/operators';
import { Observable, throwError, of } from 'rxjs';
import { environment } from '../../../../environments/environment';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  baseUrl = environment.baseUrl;
  constructor(private httpClient: HttpClient, private sessionStorage: SessionStorageService) { }

  public setHttpOptionsWithToken() {
    return {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
 //         'Authorization': 'Bearer ' + JSON.parse(this.sessionStorage.getItem('bearerToken'))
        })
      };
  }

  customLogin(data: any) {
    return this.httpClient
      .post(this.baseUrl+ apiLoginURL.customLogin(),data, httpOptions)
      .pipe(
        map((body: any) => body),
        catchError((error) => { return throwError(()=> error)
        }));
      
  }

  registerWithEmail(data: any) {
    return this.httpClient
      .post(this.baseUrl + apiLoginURL.registerWithEmail(),data, httpOptions)
      .pipe(
        map((body: any) => body),
        catchError((error) => { return throwError(()=> error)
        }));
      
  }

  updateUser(data: any) {
    return this.httpClient
      .put(this.baseUrl + apiLoginURL.editUser(),data, httpOptions)
      .pipe(
        map((body: any) => body),
        catchError((error) => { return throwError(()=> error)
        }));
      
  }

  forgotPassword(data: any) {
    return this.httpClient
      .post(this.baseUrl+apiLoginURL.forgotPassword(),data,httpOptions)
      .pipe(
        map((body: any) => body),
        catchError((error) => { return throwError(()=> error)
        }));
      
  }

  getUser(data: any) {
    return this.httpClient
      .get(this.baseUrl+apiLoginURL.getUser(data),httpOptions)
      .pipe(
        map((body: any) => body),
        catchError((error) => { return throwError(()=> error)
        }));
      
  }


  newPassword(body: any): Observable<any> {
    return this.httpClient.post(this.baseUrl+apiLoginURL.newPassword(),body,httpOptions);
    
  }

  ValidPasswordToken(body:any): Observable<any> {
    return this.httpClient.post(this.baseUrl+apiLoginURL.verifyToken(), body,httpOptions);
  }

}
