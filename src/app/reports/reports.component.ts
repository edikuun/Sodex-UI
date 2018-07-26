import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { MatTableDataSource } from '@angular/material';
import { MatFormFieldModule } from '@angular/material';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatPaginator, MatSort, MatInputModule } from '@angular/material';
import { DataSource } from '@angular/cdk/table';
import { FormControl } from '@angular/forms';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import * as _moment from 'moment';
import { ReportService } from './reports.service';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { delay } from '../../../node_modules/rxjs/operators';
import { TransactionData } from '../model/model.transactiondata';
import { AfService } from '../providers/af.service';
import { Angular5Csv } from 'angular5-csv/Angular5-csv';
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

  displayDate = new Date().toLocaleDateString();

  date = new FormControl(moment());

  displayedColumns: string[] = ['ID', 'Card ID', 'Card Number', 'Date', 'Debit Amount', 'Credit Amount', 'Particulars'];

  dataSource: MatTableDataSource<TransactionData>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  options = {
    fieldSeparator: ',',
    decimalseparator: '.',
    showLabels: true,
    showTitle: false,
    useBom: true,
    noDownload: false,
    headers: ['ID', 'Card ID', 'Card Number', 'Date', 'Debit Amount', 'Credit Amount', 'Particulars']
  };

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
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    console.log(finalStart);
    console.log(this.displayDate);
  }

  download() {
    // tslint:disable-next-line:no-unused-expression
    new Angular5Csv(this.reportService.res, 'Transactions - ' + this.displayDate, this.options);
  }

  // tslint:disable-next-line:member-ordering
  // dataSource = new MatTableDataSource(ELEMENT_DATA);

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  constructor(private reportService: ReportService, public auth: AfService) {
  }

  ngOnInit() {
  }

}
