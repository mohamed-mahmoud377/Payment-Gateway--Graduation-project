import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActivateAccountComponent } from './Components/activate-account/activate-account.component';
import { PaymentsListComponent } from './Components/payments-list/payments-list.component';
import { ProfileComponent } from './Components/profile/profile.component';
import { HomeComponent } from './home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: 'profile', component: ProfileComponent },
      { path: 'activate-account', component: ActivateAccountComponent },
      { path: 'payments', component: PaymentsListComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
