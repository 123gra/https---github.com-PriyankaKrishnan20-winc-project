import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'src/app/core/service/login/login.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  ResponseResetForm!: FormGroup;
  errorMessage!: string;
  successMessage!: string;
  resetToken!: null;
  CurrentState: any;
  IsResetFormValid = true;
  
  constructor( private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private loginService: LoginService) { 

      this.CurrentState = 'Wait';
      this.route.params.subscribe(params => {
        this.resetToken = params['token'];
        console.log(this.resetToken);
        this.VerifyToken();
      });
    }

  ngOnInit(): void {
    this.Init();
  }

  VerifyToken() {
    console.log("calling verify token");
    this.loginService.ValidPasswordToken({ resettoken: this.resetToken })
    .subscribe({next:(result:any)=>{
      this.CurrentState = 'Verified';
    },
      error:(err:any)=>{
        this.CurrentState = 'NotVerified';
      } 
  });
}

  Init() {
    this.ResponseResetForm = this.fb.group(
      {
        resettoken: [this.resetToken],
        newPassword: ['', [Validators.required, Validators.minLength(4)]],
        confirmPassword: ['', [Validators.required, Validators.minLength(4)]]
      }
    );
  }

  Validate(passwordFormGroup: FormGroup) {
    const new_password = passwordFormGroup.controls['newPassword'].value;
    const confirm_password = passwordFormGroup.controls['confirmPassword'].value;

    if (confirm_password.length <= 0) {
      return null;
    }

    if (confirm_password !== new_password) {
      return {
        doesNotMatch: true
      };
    }

    return null;
  }


  ResetPassword(form: { get: (arg0: string) => any; valid: any; }) {
    console.log(form.get('confirmPassword'));
    if (form.valid) {
      this.IsResetFormValid = true;
      this.loginService.newPassword(this.ResponseResetForm.value).subscribe(
        { next:(data:any) => {
          this.ResponseResetForm.reset();
          this.successMessage = data;
          setTimeout(() => {
            this.router.navigate(['login']);
          }, 3000);
        },
        error:(err:any)=>{
          console.log(err);
        } 
        });
    } else { this.IsResetFormValid = false; }
  }


}
