import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/core/authentication/auth.service';
import { LoginService } from 'src/app/core/service/login/login.service';
import { SessionStorageService } from 'src/app/core/service/session-storage.service';
import { UserRegister } from '../../model/user-register.model';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.scss']
})
export class UserRegistrationComponent implements OnInit {

  public registrationForm: any;

  public isPasswordMatched: boolean = false;

  public inputType: string = 'password';

  selectedGender!: string;

  public userRegister:UserRegister = new UserRegister;

  constructor(private formBuilder: FormBuilder,
    private loginService: LoginService, private authService: AuthService, private router: Router,
    private activatedRoute: ActivatedRoute,
    private sessionStorage: SessionStorageService) { }

  ngOnInit(): void {

    this.createForm();
  }

  public checkDisabled() {
    if (this.registrationForm.invalid) {
      return true;
    } else if (!this.isPasswordMatched) {
      return true;
    } else {
      return false;
    }
  }


  public createForm() {
    this.registrationForm = this.formBuilder.group({
      firstName: [null,Validators.required],
      lastName: [null,Validators.required],
      email: [null,
        Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9]+(\.[_a-zA-Z0-9]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)+(\.[a-zA-Z]{2,15})+$')])],
      // password: [null,
      //   Validators.compose([Validators.required, Validators.pattern('^(?=.{7,15})(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[~`!@#$%^&*(|:;){+=_>,./<"?}]).*$')])],
      password: [null,Validators.minLength(6)],
      confirmPassword: [null,Validators.minLength(6)],
      gender: [null,Validators.required],
      phoneNumber:[null,Validators.required],
      question:[null,Validators.required],
      answer:[null,Validators.required]

    });
    this.registrationForm.valueChanges.subscribe((val: any) => {
      if (this.registrationForm.value.password &&
        this.registrationForm.value.password === this.registrationForm.value.confirmPassword) {
        this.isPasswordMatched = true;
      } else {
        this.isPasswordMatched = false;
      }
    });
  }

  public onSelectGender(gender: any) {
    this.selectedGender = gender;
    this.registrationForm.patchValue({
      gender: gender
    }, { emitEvent: false });
  }

  public showHidePassword(value:any) {
    this.inputType = value;
  }


  public registerWithEmail() {
    console.log("Inside register");
    const param = {
      firstName: this.registrationForm.value.firstName,
      email: this.registrationForm.value.email,
      password: this.registrationForm.value.password,
      gender: this.registrationForm.value.gender,
      lastName:this.registrationForm.value.lastName,
      isAdmin:false,
      phoneNumber:this.registrationForm.value.phoneNumber,
      question:this.registrationForm.value.question,
      answer:this.registrationForm.value.answer
    };
    console.log("Param",param);
    this.loginService.registerWithEmail(param)
      .subscribe({next:(response:any) => {
        console.log("Response",response);
          this.userRegister = response;
          alert("User Registered Successfully");
          this.router.navigate(['/login'], { replaceUrl: true });
          //this.sessionStorage.setItem('bearerToken', JSON.stringify(this.registerWithEmailRes.data.token));
        
      },
        error:(err:any) => {
           console.log(err.error.message);
           var error = err.error.message;
           if(error.includes("11000")){
             alert("Email already registered..");
           }
         
        }
       });
  }

  public onClockEnter(event:any) {
    if (event.keyCode === 13) {
      if (!this.checkDisabled()) {
        this.registerWithEmail();
      } else {
        this.checkValidations();
      }
    }
  }

  public checkValidations() {
    if (this.registrationForm.get('firstName').invalid) {
      this.registrationForm.get('firstName').setErrors({ invalid: true });
      this.registrationForm.get('firstName').touched = true;
    } else if (this.registrationForm.get('lastName').invalid) {
      this.registrationForm.get('lastName').setErrors({ invalid: true });
      this.registrationForm.get('lastName').touched = true;
    } else if (this.registrationForm.get('email').invalid) {
      this.registrationForm.get('email').setErrors({ invalid: true });
      this.registrationForm.get('email').touched = true;
    } else if (this.registrationForm.get('password').invalid) {
      this.registrationForm.get('password').setErrors({ invalid: true });
      this.registrationForm.get('password').touched = true;
    } else if (this.registrationForm.get('confirmPassword').invalid) {
      this.registrationForm.get('confirmPassword').setErrors({ invalid: true });
      this.registrationForm.get('confirmPassword').touched = true;
    } else if (!this.isPasswordMatched) {
      this.registrationForm.get('confirmPassword').setErrors({ invalid: true });
      this.registrationForm.get('confirmPassword').touched = true;
    }
  }

  public onLogin() {
    this.router.navigate(['/user/login'], { replaceUrl: true });
  }

}
