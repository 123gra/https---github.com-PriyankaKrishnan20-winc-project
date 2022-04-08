import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  public getToken(){
   
    const userData = JSON.parse(sessionStorage.getItem('userProfile') || '{}');
    console.log("User Data",userData);
    return userData;
  }
}
