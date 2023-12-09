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
import {RequestedRidesComponent} from "./components/driver/requested-rides/requested-rides.component";
import {AppliedRidesComponent} from "./components/user/applied-rides/applied-rides.component";
import {ListDriverRidesComponent} from "./components/driver/list-driver-rides/list-driver-rides.component";
import { HomeComponent } from './components/shareed/home/home.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'check-email/:email', component: CheckEmailComponent},
  {path: 'verify-account', component: VerifyAccountComponent},

  {path: 'forgot-password', component: ForgotPasswordComponent},
  {path: 'reset-password/:token', component: ResetPasswordComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  //{path: '', redirectTo: '/login', pathMatch: 'full'},
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
      {path: 'list-car', component: ListCarsComponent},
      {path: 'requested-rides', component: RequestedRidesComponent},
      {path: 'list-driver-rides', component: ListDriverRidesComponent}
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
      {path: 'applied-rides', component: AppliedRidesComponent},

    ]
  },
  {path: 'rides', component: RideComponent},
  {path: '**', component: NotFoundComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
