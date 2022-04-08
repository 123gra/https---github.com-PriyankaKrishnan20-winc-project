import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './core/authentication/auth.service';
import { SessionStorageService } from './core/service/session-storage.service';
import { UserRegister } from './login/model/user-register.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
 
  public manageHeader: string = 'LOGOUT';

  title = 'EventManagement';
  selectedCity: any;
  data: Array<{ id: string; name: string }> = [
    { id: 'Mumbai', name: 'Mumbai' },
    { id: 'Bengaluru', name: 'Bengaluru' },
    { id: 'Hyderabad', name: 'Hyderabad' },
    { id: 'Delhi', name: 'Delhi' },
  ];

 constructor(private router : Router,private authService:AuthService,private sessionStorage: SessionStorageService){}

  ngOnInit(): void {
    if (JSON.stringify(this.authService.getToken()) !="{}") { 
      this.manageHeader = 'LOGIN'; 
      
  }

  }

 login(){
   this.router.navigate(['login'])
 }

 register(){
   this.router.navigate(['register'])
 }

 logOut(){
  sessionStorage.removeItem('userProfile');
  sessionStorage.removeItem('bearerToken');
  this.sessionStorage.setItem('bearerToken', null);
  this.sessionStorage.setItem('userProfile', null);
  this.manageHeader = 'LOGOUT';
  this.router.navigate(['/user/login'], { replaceUrl: true });
 }

 userProfile(){
  this.router.navigate(['/user-profile'], { replaceUrl: true });
 }

 filterOnName(event: any) {
  const filterEvent = new CustomEvent('filterEvents', {
    detail: event.target.value,
  });
  window.dispatchEvent(filterEvent);
}

selected(event: any) {
  const filterEventsByCity = new CustomEvent('filterEventsByCity', {
    detail: event.target.options[event.target.options.selectedIndex].text,
  });
  window.dispatchEvent(filterEventsByCity);
}

homePage() {
  this.router.navigate(['']);
}

admin(){
  this.router.navigate(['admin'])
}

}
