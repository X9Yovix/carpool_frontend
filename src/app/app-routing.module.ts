import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AdminDashboardComponent} from './components/admin/adminDashboard/adminDashboard.component';
import {UserDashboardComponent} from './components/user/userDashboard/userDashboard.component';
import {NotFoundComponent} from './components/shareed/NotFound/NotFound.component';
import {DriverDashboardComponent} from './components/driver/driverDashboard/driverDashboard.component';
import {AuthGuard} from './guards/Auth-guard';
import {LoginComponent} from './components/auth/login/login.component';
import {RegisterComponent} from './components/auth/register/register.component';
import {CheckEmailComponent} from './components/auth/check-email/check-email.component';
import {ForgotPasswordComponent} from "./components/auth/forgot-password/forgot-password.component";
import {ResetPasswordComponent} from "./components/auth/reset-password/reset-password.component";
import {VerifyAccountComponent} from "./components/auth/verify-account/verify-account.component";
import {AddRideComponent} from "./components/driver/add-ride/add-ride.component";
import {RideComponent} from "./components/user/ride/ride.component";
import {AddCarComponent} from "./components/driver/add-car/add-car.component";
import {ListCarsComponent} from "./components/driver/list-cars/list-cars.component";

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'check-email/:email', component: CheckEmailComponent},
  {path: 'verify-account', component: VerifyAccountComponent},

  {path: 'forgot-password', component: ForgotPasswordComponent},
  {path: 'reset-password/:token', component: ResetPasswordComponent},
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {
    path: 'admin', component: AdminDashboardComponent,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    data: {
      role: 'ADMIN'
    }
  },
  {
    path: 'driver', component: DriverDashboardComponent,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    data: {
      role: 'DRIVER'
    },
    children: [
      {path: 'add-ride', component: AddRideComponent},
      {path: 'add-car', component: AddCarComponent},
      {path: 'list-car', component: ListCarsComponent}
    ]
  },
  {
    path: 'user', component: UserDashboardComponent,
    canActivate: [AuthGuard],
    canActivateChild:[AuthGuard],
    data: {
      role: 'PASSENGER'
    },
    children: [
      {path: 'rides', component: RideComponent},
    ]
  },
  {path: '**', component: NotFoundComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
