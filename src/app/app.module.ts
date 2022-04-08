import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {APP_BASE_HREF} from '@angular/common';
import { AppRoutingModule,routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserLoginComponent } from './login/user-login/user-login/user-login.component';
import { UserRegistrationComponent } from './login/user-registration/user-registration/user-registration.component';
import { EventListComponent } from './event/event-list/event-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BookingComponent } from './booking/booking.component';
import { AuthService } from './core/authentication/auth.service';
import { AuthenticationGuard } from './core/authentication/authentication.guard';
import { AuthGuard } from './auth.guard';
import { ForgotPasswordComponent } from './login/forgot-password/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './login/reset-password/reset-password/reset-password.component';
import { UserEditComponent } from './user-edit/user-edit/user-edit.component';
import { UserProfileComponent } from './login/user-profile/user-profile/user-profile.component';
import { EventCardComponent } from './event/event-card/event-card.component';
import { AdminLoginComponent } from './admin/admin-login/admin-login.component';

@NgModule({
  declarations: [
    AppComponent,
    UserLoginComponent,
    UserRegistrationComponent,
    EventListComponent,
    BookingComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    UserEditComponent,
    UserProfileComponent,
    EventCardComponent,
    AdminLoginComponent,
    routingComponents
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule

  ],
  providers: [{provide: APP_BASE_HREF, useValue: ''}, AuthService , AuthenticationGuard, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
