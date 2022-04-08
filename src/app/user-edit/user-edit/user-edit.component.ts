import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/core/authentication/auth.service';
import { LoginService } from 'src/app/core/service/login/login.service';
import { SessionStorageService } from 'src/app/core/service/session-storage.service';
import { UserRegister } from 'src/app/login/model/user-register.model';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  public editForm: any;

  public isPasswordMatched: boolean = false;

  public gender!:string; 
  selectedGender!: string;

  public userRegister:UserRegister = new UserRegister();

  constructor(private formBuilder: FormBuilder,
    private loginService: LoginService, private authService: AuthService, private router: Router,
    private activatedRoute: ActivatedRoute,
    private sessionStorage: SessionStorageService) { }

  ngOnInit(): void {

    this.createForm();
    this.userRegister = JSON.parse(sessionStorage.getItem('userProfile') || '{}');
    let userId =  this.userRegister?._id; 
    this.loginService.getUser(userId).subscribe(res=>{
      this.gender = res.user1.gender; 
       this.editForm.setValue({
        firstName: res.user1.firstName,
        lastName: res.user1.lastName,
        email: res.user1.email,
        gender: res.user1.gender,
        phoneNumber: res.user1.phoneNumber
       })
    });
  }


  public createForm() {
    this.editForm = this.formBuilder.group({
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      email: [null,
        Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9]+(\.[_a-zA-Z0-9]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)+(\.[a-zA-Z]{2,15})+$')])],
      // password: [null,
      //   Validators.compose([Validators.required, Validators.pattern('^(?=.{7,15})(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[~`!@#$%^&*(|:;){+=_>,./<"?}]).*$')])],
      //password: [null, Validators.required],
      //confirmPassword: [null, Validators.required],
      gender: [null, Validators.required],
      phoneNumber:[null,Validators.required]

    });
  }

  public onSelectGender(gender: any) {
    console.log("inside gender");
    this.gender = gender;
    //this.selectedGender = gender;
    console.log(this.selectedGender);
    this.editForm.patchValue({
      gender: gender
    }, { emitEvent: false });
  }



  public registerWithEmail() {
    
    const param = {
      firstName: this.editForm.value.firstName,
      email: this.editForm.value.email,
      password: this.editForm.value.password,
      gender: this.editForm.value.gender,
      lastName:this.editForm.value.lastName,
      isAdmin:false
    };
    this.loginService.registerWithEmail(param)
      .subscribe({next:(response:any) => {
          this.userRegister = response;
          this.router.navigate(['/login'], { replaceUrl: true });
          //this.sessionStorage.setItem('bearerToken', JSON.stringify(this.registerWithEmailRes.data.token));
        
      },
        error:(err:any) => {
           console.log(err);
         
        }
       });
  }

  public editUser() {
    this.userRegister = JSON.parse(sessionStorage.getItem('userProfile') || '{}');
    let userId =  this.userRegister?._id; 
    const param = {
      firstName: this.editForm.value.firstName,
      email: this.editForm.value.email,
      //password: this.editForm.value.password,
      phoneNumber: this.editForm.value.phoneNumber,
      gender: this.editForm.value.gender,
      lastName:this.editForm.value.lastName,
      isAdmin:false,
      _id:userId
    };
    this.loginService.updateUser(param)
      .subscribe({next:(response:any) => {
        console.log("API response",response);
          this.userRegister = response;
          alert("User details Updated Successfully");
          this.router.navigate(['/user-profile']);          
          //this.sessionStorage.setItem('bearerToken', JSON.stringify(this.registerWithEmailRes.data.token));
        
      },
        error:(err:any) => {
           console.log(err);
         
        }
       });
  }

  public checkValidations() {
    if (this.editForm.get('firstName').invalid) {
      this.editForm.get('firstName').setErrors({ invalid: true });
      this.editForm.get('firstName').touched = true;
    } else if (this.editForm.get('lastName').invalid) {
      this.editForm.get('lastName').setErrors({ invalid: true });
      this.editForm.get('lastName').touched = true;
    } else if (this.editForm.get('email').invalid) {
      this.editForm.get('email').setErrors({ invalid: true });
      this.editForm.get('email').touched = true;
    } else if (this.editForm.get('password').invalid) {
      this.editForm.get('password').setErrors({ invalid: true });
      this.editForm.get('password').touched = true;
    } else if (this.editForm.get('confirmPassword').invalid) {
      this.editForm.get('confirmPassword').setErrors({ invalid: true });
      this.editForm.get('confirmPassword').touched = true;
    } else if (!this.isPasswordMatched) {
      this.editForm.get('confirmPassword').setErrors({ invalid: true });
      this.editForm.get('confirmPassword').touched = true;
    }
  }

  public onLogin() {
    this.router.navigate(['/user/login'], { replaceUrl: true });
  }

}
