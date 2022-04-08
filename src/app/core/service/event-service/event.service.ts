import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { apiLoginURL } from 'src/app/config/api.login';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};
@Injectable({
  providedIn: 'root',
})
export class EventService {
  baseUrl: string = 'http://localhost:8000';

  constructor(private httpClient: HttpClient) {}

  getAllEvents() {
    return this.httpClient
      .get(this.baseUrl + apiLoginURL.getAllEvents(), httpOptions)
      .pipe(
        map((body: any) => body),
        catchError((error) => {
          return throwError(() => error);
        })
      );
  }

  getEventById(id: string) {
    return this.httpClient
      .get(this.baseUrl + apiLoginURL.getEventById(id), httpOptions)
      .pipe(
        map((body: any) => body),
        catchError((error) => {
          return throwError(() => error);
        })
      );
  }

  getVenueById(id: string) {
    return this.httpClient
      .get(this.baseUrl + apiLoginURL.getVenueById(id), httpOptions)
      .pipe(
        map((body: any) => body),
        catchError((error) => {
          return throwError(() => error);
        })
      );
  }
}
