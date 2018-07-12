import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
import {MatSidenavModule} from '@angular/material/sidenav';
import {FormBuilder, FormGroup} from '@angular/forms';
import { AfService } from '../providers/af.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {


  constructor(
    public auth: AfService
  ) {
  }

  ngOnInit() {
  }

}
