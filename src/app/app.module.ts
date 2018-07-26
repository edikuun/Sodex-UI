import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { TransferComponent } from './transfer/transfer.component';
import { DialogOverviewExampleDialogComponent } from './transfer/transfer.component';


import { TransferService } from './transfer/transfer.service';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { ProfileComponent } from './profile/profile.component';
import { LoginComponent } from './login/login.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AfService } from './providers/af.service';
import { AngularFireAuth, AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { UserComponent } from './user/user.component';
import { UserService } from './providers/user.service';
import { AuthGuard } from './providers/af.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ReportsComponent } from './reports/reports.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashbarComponent } from './dashbar/dashbar.component';
import { LayoutModule } from '@angular/cdk/layout';
// tslint:disable-next-line:max-line-length
import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule, MatFormFieldModule, MatInputModule, MatTableModule, MatDatepickerModule, NativeDateModule, MatTabsModule, MatCheckbox, MatCheckboxModule, MatSortModule, MatPaginatorModule, MatPaginator, MatDialogModule, MatGridListModule, MatSnackBarModule } from '@angular/material';
import { CdkTableModule } from '../../node_modules/@angular/cdk/table';
import { FormsModule, ReactiveFormsModule } from '../../node_modules/@angular/forms';
import { ReportService } from './reports/reports.service';
import { Dashboard2Component } from './dashboard2/dashboard2.component';
import { AdminloginComponent } from './adminlogin/adminlogin.component';
import { HashLocationStrategy, LocationStrategy, PathLocationStrategy } from '@angular/common';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    FooterComponent,
    TransferComponent,
    ProfileComponent,
    LoginComponent,
    UserComponent,
    DashboardComponent,
    ReportsComponent,
    SidebarComponent,
    DashbarComponent,
    Dashboard2Component,
    AdminloginComponent,
    DialogOverviewExampleDialogComponent
  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features
    AppRoutingModule,
    HttpClientModule,
    HttpModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    CdkTableModule,
    MatTableModule,
    MatDatepickerModule,
    NativeDateModule,
    FormsModule,
    ReactiveFormsModule,
    MatTabsModule,
    MatCheckboxModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule,
    NgbModule,
    MatGridListModule,
    MatSnackBarModule
  ],
  entryComponents: [
    DialogOverviewExampleDialogComponent
  ],
  providers: [
    TransferService,
    ReportService,
    AfService,
    AngularFireAuth,
    UserService,
    AuthGuard,
    {provide: LocationStrategy, useClass: HashLocationStrategy}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
