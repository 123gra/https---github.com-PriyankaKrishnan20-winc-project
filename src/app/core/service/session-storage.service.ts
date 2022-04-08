import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';


@Injectable({
    providedIn: "root"
})
export class SessionStorageService {
    
    private cacheStorage: Map<any, any> = new Map();
    
    public sessionStorage: Map<string, string> = new Map<string, string>();

    constructor() {

    }

  public setCacheStorage(key: any, data: any) {
    this.cacheStorage.set(key, JSON.stringify(data));
  }

  public getCacheStorage(key: any): any {
    if (this.cacheStorage.get(key)) {
      return JSON.parse(this.cacheStorage.get(key));
    } else {
      return null;
    }
  }

  public clearStorage() {
    this.cacheStorage = new Map();
  }

    public setItem(key: any, data: any) {
        this.sessionStorage.set(key, data);
    }

    public getItem(key: any) {
        if (this.sessionStorage.get(key)) {
            return this.sessionStorage.get(key);
        } else {
            return null;
        }
    }
}