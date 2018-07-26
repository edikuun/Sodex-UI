import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AfService } from '../providers/af.service';

@Component({
  selector: 'app-adminlogin',
  templateUrl: './adminlogin.component.html',
  styleUrls: ['./adminlogin.component.scss']
})
export class AdminloginComponent implements OnInit {

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
    // if (this.user.email === 'sodex.main') {
      this.authService.signInRegular(this.user.email + '@gmail.com', this.user.password)
      .then((res) => {
        // console.log(res);
        // alert(res);
        this.router.navigate(['/dashboard']);
      })
      .catch((err) => alert('Invalid Email or Password'));
    // } else {
      // alert('Not an Admin Account, Please Login Again');
      // console.log('Not an Admin Account, Please Login Again');
    }
  // }


  ngOnInit() {
  }

}
