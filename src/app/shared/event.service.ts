import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';


import { Event } from './event.model';

@Injectable()

export class EventService {

 constructor(private http: HttpClient){

 };

  selectedEvent!: Event ;//= new Event;
  events!: Event[] ;
  readonly baseURL='http://localhost:8000';
  postEvent(evt:Event){
 return this.http.post(this.baseURL,evt);
  };

  getEventList(){
    return this.http.get(this.baseURL);

  };
  putEvent(evt:Event){
    return this.http.put(this.baseURL + `/${evt._id}`,evt);
  };

  deleteEvent(_id:String){
    return this.http.delete(this.baseURL + `/${_id}`);
  }
}
