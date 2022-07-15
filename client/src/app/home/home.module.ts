import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckoutComponent } from '../checkout/checkout.component';
import { NotFoundComponent } from '../not-found/not-found.component';
import { CompLoadingComponent } from '../shared/loading/component/comp-loading/comp-loading.component';
import { LoadingComponent } from '../shared/loading/html/loading.component';
import { ActivateAccountComponent } from './Components/activate-account/activate-account.component';
import { ActivationFormComponent } from './Components/activate-account/activation-form/activation-form.component';
import { DeclinedComponent } from './Components/activate-account/declined/declined.component';
import { PendingComponent } from './Components/activate-account/pending/pending.component';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { ProfileComponent } from './Components/profile/profile.component';
import { HomeComponent } from './home.component';
import { PrimengModule } from '../primeng/primeng.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeRoutingModule } from './home-routing.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HeaderInterceptor } from '../shared/interceptors/header.interceptor';
import { ErrorComponent } from '../shared/error/error.component';
import { PaymentsComponent } from './Components/payments/payments.component';

@NgModule({
  declarations: [
    HomeComponent,
    CheckoutComponent,
    NavbarComponent,
    LoadingComponent,
    ProfileComponent,
    CompLoadingComponent,
    ActivateAccountComponent,
    ActivationFormComponent,
    PendingComponent,
    DeclinedComponent,
    NotFoundComponent,
    ErrorComponent,
    PaymentsComponent,
  ],
  imports: [
    CommonModule,
    PrimengModule,
    FormsModule,
    ReactiveFormsModule,
    HomeRoutingModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HeaderInterceptor,
      multi: true,
    },
  ],
})
export class HomeModule {}
