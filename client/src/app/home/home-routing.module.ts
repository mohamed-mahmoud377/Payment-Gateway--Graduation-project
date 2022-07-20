import { WebhookComponent } from './Components/webhook/webhook.component';
import { SingleCustomerComponent } from './Components/customers/single-customer/single-customer.component';
import { SinglePaymentComponent } from './Components/payments/single-payment/single-payment.component';
import { CustomersComponent } from './Components/customers/customers.component';
import { PaymentsComponent } from './Components/payments/payments.component';
import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActivateAccountComponent } from './Components/activate-account/activate-account.component';
import { ProfileComponent } from './Components/profile/profile.component';
import { HomeComponent } from './home.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: '', component: DashboardComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'activate-account', component: ActivateAccountComponent },
      { path: 'payments', component: PaymentsComponent },
      { path: 'payment/:id', component: SinglePaymentComponent },
      { path: 'customers', component: CustomersComponent },
      { path: 'customer/:id', component: SingleCustomerComponent },
      { path: 'webhook', component: WebhookComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
