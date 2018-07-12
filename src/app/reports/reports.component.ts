import { Component, OnInit } from '@angular/core';
import { NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { MatTableDataSource } from '@angular/material';
import { MatFormFieldModule } from '@angular/material';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material';
import { DataSource } from '@angular/cdk/table';
import { FormControl } from '@angular/forms';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import * as _moment from 'moment';
import { ReportService } from './reports.service';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { delay } from '../../../node_modules/rxjs/operators';
import { TransactionData } from '../model/model.transactiondata';
// tslint:disable-next-line:no-duplicate-imports
// import {default as _rollupMoment} from 'moment';

const moment = _moment;

// See the Moment.js docs for the meaning of these formats:
// https://momentjs.com/docs/#/displaying/format/
export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'L',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

export interface TransactionData {
  Id: number;
  CardId: number;
  CardNumber: string;
  LedgerDateTime: string;
  DebitAmount: number;
  CreditAmount: number;
  Particulars: string;
}
@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss'],
  providers: [
    // `MomentDateAdapter` can be automatically provided by importing `MomentDateModule` in your
    // application's root module. We provide it at the component level here, due to limitations of
    // our example generation script.
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },

    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class ReportsComponent implements OnInit {

  date = new FormControl(moment());

  n = 1;

  displayedColumns: string[] = ['ID', 'Card ID', 'Date', 'Debit Amount', 'Credit Amount', 'Particulars'];

  dataSource;

  transact() {
    const card = (<HTMLInputElement>document.getElementById('card'));
    const start = (<HTMLInputElement>document.getElementById('start'));
    const end = (<HTMLInputElement>document.getElementById('end'));
    const splitStart = start.value.split('/', 3);
    const splitEnd = end.value.split('/', 3);
    const finalStart = splitStart[2] + '-' + splitStart[0] + '-' + splitStart[1];
    const finalEnd = splitEnd[2] + '-' + splitEnd[0] + '-' + splitEnd[1];

    // tslint:disable-next-line:no-unused-expression
    this.reportService.getTransaction(card.value, finalStart, finalEnd);
    this.dataSource = new MatTableDataSource(this.reportService.res);
    console.log(finalStart);
  }

  // tslint:disable-next-line:member-ordering
  // dataSource = new MatTableDataSource(ELEMENT_DATA);

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  constructor(private reportService: ReportService) {
  }

  ngOnInit() {
  }

}
