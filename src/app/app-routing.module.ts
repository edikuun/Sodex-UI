import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { TransferComponent } from './transfer/transfer.component';
import { ProfileComponent } from './profile/profile.component';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { DashbarComponent } from './dashbar/dashbar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ReportsComponent } from './reports/reports.component';
import { Dashboard2Component } from './dashboard2/dashboard2.component';
import { AuthGuard } from './providers/af.guard';
import { AdminloginComponent } from './adminlogin/adminlogin.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: AdminloginComponent },
  {
    path: 'dashboard',
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    component: Dashboard2Component,
    children:
      [
        { path: '', redirectTo: 'transfer', pathMatch: 'full' },
        // { path: 'profile', component: ProfileComponent },
        { path: 'transfer', component: TransferComponent },
        { path: 'reports', component: ReportsComponent },
        { path: 'login', component: LoginComponent }
      ]
  },
  // { path: 'side', canActivate: [AuthGuard], component : SidebarComponent},
  // { path: 'reports', component: ReportsComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
