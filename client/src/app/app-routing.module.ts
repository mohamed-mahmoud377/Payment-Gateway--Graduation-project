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
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
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
    path: 'checkout/pay/:hash',
    component: CheckoutComponent,
    canActivate: [AuthGuard],
  },
  {
    path: '',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./home/home.module').then((model) => model.HomeModule),
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
