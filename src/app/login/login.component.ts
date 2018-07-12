import { Component, OnInit } from '@angular/core';
import { AfService } from '../providers/af.service';
import { Router, Params } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  test: Date = new Date();
  // tslint:disable-next-line:no-shadowed-variable
  constructor(public auth: AfService) {

   }


  ngOnInit() {
  }

  // tryFacebookLogin() {
  //   this.AfService.doFacebookLogin()
  //   .then(res => {
  //     this.router.navigate(['/user']);
  //   });
  // }

  // tryGoogleLogin() {
  //   this.AfService.doGoogleLogin()
  //   .then(res => {
  //     this.router.navigate(['/user']);
  //   });
  // }

  // tryLogin(value) {
  //   this.AfService.doLogin(value)
  //   .then(res => {
  //     this.router.navigate(['/user']);
  //   }, err => {
  //     console.log(err);
  //     this.errorMessage = err.message;
  //   })
  // }
}

