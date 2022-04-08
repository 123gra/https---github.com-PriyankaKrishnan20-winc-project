import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router : Router
  ) {} 
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
     // this.router.navigateByUrl("/login");  
     //console.log("Get Token",JSON.stringify(this.authService.getToken()));
      if (JSON.stringify(this.authService.getToken()) =="{}") { 
        console.log("In guard"); 
        this.router.navigateByUrl("/login");  
    }
      return JSON.stringify(this.authService.getToken()) =="{}"?false:true;
    
    //
    //return this.authService.getToken(); 
  }
  
}
