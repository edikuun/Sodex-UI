import { Component, OnInit } from '@angular/core';
import { AfService } from '../providers/af.service';
import { TransferService } from '../transfer/transfer.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  balance = ' ';

  dateObj = new Date();
  month = this.dateObj.getUTCMonth() + 1;
  day = this.dateObj.getUTCDate();
  year = this.dateObj.getUTCFullYear();

  newdate = this.month + '/' + this.day + '/' + this.year;

  constructor(
    public auth: AfService,
    private trans: TransferService
  ) { }



  ngOnInit() {
    // this.getBalance();
  }

}
