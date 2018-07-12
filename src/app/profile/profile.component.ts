import { Component, OnInit } from '@angular/core';
import { AfService } from '../providers/af.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(
    public auth: AfService
  ) { }

  ngOnInit() {
  }

}
