import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/core/service/login/login.service';
import { SessionStorageService } from 'src/app/core/service/session-storage.service';
import { UserRegister } from '../../model/user-register.model';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  public userRegister:UserRegister = new UserRegister();

  constructor(private loginService: LoginService,private sessionStorage: SessionStorageService,private router: Router) { }

  ngOnInit(): void {
    this.userRegister = JSON.parse(sessionStorage.getItem('userProfile') || '{}');
    let userId =  this.userRegister?._id; 
    this.loginService.getUser(userId).subscribe(res=>{     
      this.userRegister = res.user1;
      console.log(this.userRegister);
    });
  }

  editUser(){
    this.router.navigate(['/user-edit']);
  }


}
