import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookingComponent } from './booking/booking.component';
import { EventListComponent } from './event/event-list/event-list.component';
import { UserLoginComponent } from './login/user-login/user-login/user-login.component';
import { UserRegistrationComponent } from './login/user-registration/user-registration/user-registration.component';
import { AuthenticationGuard } from './core/authentication/authentication.guard'; 
import { AuthGuard } from './auth.guard';
import { ForgotPasswordComponent } from './login/forgot-password/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './login/reset-password/reset-password/reset-password.component';
import { UserEditComponent } from './user-edit/user-edit/user-edit.component';
import { UserProfileComponent } from './login/user-profile/user-profile/user-profile.component';
import { EventDetailsComponent } from './event/event-details/event-details.component';
import { BookingConfirmationComponent } from './booking-confirmation/booking-confirmation.component';
import { AdminLoginComponent } from './admin/admin-login/admin-login.component';

const routes: Routes = [

  {path:'', component:EventListComponent},
  {path:'login', component:UserLoginComponent , canActivate:[AuthGuard]},
  {path:'register', component:UserRegistrationComponent, canActivate:[AuthGuard]},
  {path:'forgot-password', component: ForgotPasswordComponent},
  {path:'user-edit',component:UserEditComponent, canActivate:[AuthenticationGuard]},
  {path:'user-profile',component:UserProfileComponent, canActivate:[AuthenticationGuard]},
  {
    path: 'password-reset/:userId/:token',
    component: ResetPasswordComponent
  },
  {path:'admin',component:AdminLoginComponent},
  { path: 'event/:eventId', component: EventDetailsComponent},
  { path: 'booking/:eventId', component: BookingComponent },
  {
    path: 'booking-confirmed/:bookingId',
    component: BookingConfirmationComponent,
  },
  {path:'**', component:EventListComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthenticationGuard,AuthGuard]
})
export class AppRoutingModule { }
export const routingComponents=[EventListComponent,UserLoginComponent,UserRegistrationComponent,
  AdminLoginComponent]
