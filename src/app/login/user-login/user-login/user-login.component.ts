import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {Location} from '@angular/common'
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from 'src/app/core/authentication/auth.service';
import { LoginService } from 'src/app/core/service/login/login.service';
import { SessionStorageService } from 'src/app/core/service/session-storage.service';
import { UserRegister } from '../../model/user-register.model';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {

  public loginForm: any;

  public inputType: string = 'password';

  public userLogin:UserRegister = new UserRegister;

  lastUrl:string = '/booking';

  constructor(private fb: FormBuilder, private loginService: LoginService,private sessionStorage: SessionStorageService,
    private authService: AuthService, private router: Router,private _location: Location) { }

  ngOnInit(): void {
     this.createForm();
    
  }

  public createForm() {
    this.loginForm = this.fb.group({
      email: [null,
        Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9]+(\.[_a-zA-Z0-9]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)+(\.[a-zA-Z]{2,15})+$')])],
      password: [null, Validators.required]
    });
  }

  public customLogin() {
    console.log("Login method");
    const param = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    };
    this.loginService.customLogin(param)
      .subscribe({next:(result:any)=>{
        console.log("Result",result.user);
        this.userLogin = result.user;
        sessionStorage.setItem('userProfile', JSON.stringify(this.userLogin));
        this.sessionStorage.setItem('bearerToken', JSON.stringify(result.token));
        location.reload();
        this.router.navigate([this.lastUrl]);
        //console.log(result);
      },
        error:(err:any)=>{
          if(err.status == 401){
            alert("Invalid Credentials");
          }
          console.log(err);
        } 
      })
  }

  public onClockEnter(event:any) {
    if (event.keyCode === 13) {
      if (!this.loginForm.invalid) {
        this.customLogin();
      } else {
        this.checkValidations();
      }
    }
  }

  public checkValidations() {
    if (this.loginForm.get('email').invalid) {
      this.loginForm.get('email').setErrors({ invalid: true });
      this.loginForm.get('email').touched = true;
    } else if (this.loginForm.get('password').invalid) {
      this.loginForm.get('password').setErrors({ invalid: true });
      this.loginForm.get('password').touched = true;
    }
  }

  public showHidePassword(value: string) {
    if (value === 'PASS') {
      this.inputType = 'text';
    } else {
      this.inputType = 'password';
    }
  }

  forgotPassword(){
    this.router.navigate(['/forgot-password']);
  }

}
