import { Component, OnInit } from '@angular/core';
// import { FirebaseUserModel } from '../providers/user.model';
import { AfService } from '../providers/af.service';
import { ActivatedRoute } from '../../../node_modules/@angular/router';
import { UserService } from '../providers/user.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  // user: FirebaseUserModel;

  constructor(
    public auth: AfService
  ) { }

  ngOnInit() {
  }
}
