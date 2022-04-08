import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './core/authentication/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
 
  constructor(
  private authService: AuthService,
    private router : Router){}
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (JSON.stringify(this.authService.getToken()) !="{}") { 
        console.log("In guard"); 
        this.router.navigateByUrl("/booking");  
    }
    return JSON.stringify(this.authService.getToken()) =="{}"?true:false;
  }
  
}
