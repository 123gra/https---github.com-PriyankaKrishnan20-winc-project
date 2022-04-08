import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/core/service/login/login.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  constructor(private fb: FormBuilder,private loginService: LoginService,private router: Router) { }

  public forgotPassword: any;

  ngOnInit(): void {
    this.createForm();

  }

  createForm() {
    this.forgotPassword = this.fb.group({
      email: [null,
        Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9]+(\.[_a-zA-Z0-9]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)+(\.[a-zA-Z]{2,15})+$')])]

    });
  }

  resetPassword() {
    const param = {
      email: this.forgotPassword.value.email
    };
    this.loginService.forgotPassword(param)
    .subscribe({next:(result:any)=>{
      alert(result.message);
      this.router.navigate(['login']);
    },
      error:(err:any)=>{
        if(err.status == 401){
          alert("Invalid Credentials");
        }
        console.log(err);
      } 
    })
  }

}
