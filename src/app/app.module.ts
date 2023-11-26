import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './components/shareed/interceptors/auth.interceptor';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CheckEmailComponent } from './components/auth/check-email/check-email.component';
import { ResetPasswordComponent } from './components/auth/reset-password/reset-password.component';
import {ForgotPasswordComponent} from "./components/auth/forgot-password/forgot-password.component";
import {ToastrModule} from "ngx-toastr";
import { VerifyAccountComponent } from './components/auth/verify-account/verify-account.component';
import { SpinnerComponent } from './components/shareed/spinner/spinner.component';
import {LoadingInterceptor} from "./components/shareed/interceptors/LoadingInterceptor";
import { AddRideComponent } from './components/driver/add-ride/add-ride.component'; // Import ReactiveFormsModule

@NgModule({
  bootstrap: [AppComponent],
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    CheckEmailComponent,
    ResetPasswordComponent,
    ForgotPasswordComponent,
    VerifyAccountComponent,
    SpinnerComponent,
    AddRideComponent,

  ],
  imports: [
    ToastrModule.forRoot(),
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    BrowserModule,
    ReactiveFormsModule

  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingInterceptor,
      multi: true,
    },
  ],
})
export class AppModule { }
