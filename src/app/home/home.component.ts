import { Component, OnInit } from '@angular/core';
import { AfService } from '../providers/af.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  test: Date = new Date();

  constructor(public authService: AfService) { }

  ngOnInit() {
  }

}
