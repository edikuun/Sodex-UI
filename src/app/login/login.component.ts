import { Component, OnInit } from '@angular/core';
import { AfService } from '../providers/af.service';
import { Router, Params } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  user = {
    email: '',
    password: ''
  };

  constructor(private authService: AfService, private router: Router) { }

  signInWithFacebook() {
    this.authService.signInWithFacebook()
    .then((res) => {
        this.router.navigate(['/home']);
      })
    .catch((err) => console.log(err));
  }


  signInWithGoogle() {
    this.authService.signInWithGoogle()
    .then((res) => {
        this.router.navigate(['/home']);
      })
    .catch((err) => console.log(err));
  }

  signInWithGithub() {
    this.authService.signInWithGithub()
    .then((res) => {
        this.router.navigate(['dashboard']);
      })
    .catch((err) => console.log(err));
  }

  signInWithEmail() {
      this.authService.signInRegular(this.user.email + '@gmail.com', this.user.password)
      .then((res) => {
        console.log(res);
        this.router.navigate(['/home']);
      })
      .catch((err) => console.log('error: ' + err));
  }


  ngOnInit() {
  }
}

