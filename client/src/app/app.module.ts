import { HeaderInterceptor } from './shared/interceptors/header.interceptor';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { PrimengModule } from './primeng/primeng.module';
import { CheckoutComponent } from './checkout/checkout.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { VerifyEmailComponent } from './verify-email/verify-email.component';
import { CodeInputModule } from 'angular-code-input';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { NavbarComponent } from './home/Components/navbar/navbar.component';
import { LoadingComponent } from './shared/loading/html/loading.component';
import { ProfileComponent } from './profile/profile.component';
import { CompLoadingComponent } from './shared/loading/component/comp-loading/comp-loading.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent,
    CheckoutComponent,
    VerifyEmailComponent,
    ForgetPasswordComponent,
    ResetPasswordComponent,
    NavbarComponent,
    LoadingComponent,
    ProfileComponent,
    CompLoadingComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PrimengModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CodeInputModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HeaderInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
