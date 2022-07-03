import { CheckoutComponent } from './checkout/checkout.component';
import { ActivateAccountComponent } from './home/Components/activate-account/activate-account.component';
import { ProfileComponent } from './home/Components/profile/profile.component';
import { LoginGuard } from './guards/login.guard';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { AuthGuard } from './guards/auth.guard';
import { VerifyEmailGuard } from './guards/verify-email.guard';
import { VerifyEmailComponent } from './verify-email/verify-email.component';
import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'signin', component: LoginComponent, canActivate: [LoginGuard] },
  { path: 'signup', component: SignupComponent, canActivate: [LoginGuard] },
  {
    path: 'verify-email/:userId',
    component: VerifyEmailComponent,
    canActivate: [],
  },
  {
    path: 'forget-password',
    component: ForgetPasswordComponent,
    canActivate: [LoginGuard],
  },
  {
    path: 'reset-password/:token',
    component: ResetPasswordComponent,
    canActivate: [LoginGuard],
  },
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'profile',
        component: ProfileComponent,
      },
      {
        path: 'activate-account',
        component: ActivateAccountComponent,
      },
    ],
  },
  {
    path: 'checkout/pay/:hash',
    component: CheckoutComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
