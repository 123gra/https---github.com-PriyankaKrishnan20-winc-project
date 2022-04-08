import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { apiLoginURL } from 'src/app/config/api.login';
import { throwError } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class BookingServiceService {
  baseUrl: string = 'http://localhost:8000';

  constructor(private httpClient: HttpClient) {}

  bookSlot(data: any) {
    return this.httpClient
      .post(this.baseUrl + apiLoginURL.bookSlot(), data, httpOptions)
      .pipe(
        map((body: any) => body),
        catchError((error) => {
          return throwError(() => error);
        })
      );
  }

  getBookingById(id: string) {
    return this.httpClient
      .get(this.baseUrl + apiLoginURL.getBookingById(id), httpOptions)
      .pipe(
        map((body: any) => body),
        catchError((error) => {
          return throwError(() => error);
        })
      );
  }
}
