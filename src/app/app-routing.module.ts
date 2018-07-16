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

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'dashboard',
    component: Dashboard2Component,
    children:
      [
        { path: '', redirectTo: 'profile', pathMatch: 'full' },
        { path: 'profile', component: ProfileComponent },
        { path: 'transfer', component: TransferComponent },
        { path: 'reports', component: ReportsComponent }
      ]
  },
  { path: 'side', component : SidebarComponent},
  // { path: 'reports', component: ReportsComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
