import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';

import { TransferData } from '../model/model.transferdata';
import { MatDialog } from '../../../node_modules/@angular/material';

import {MatSnackBar} from '@angular/material';

@Injectable()
export class TransferService {
    constructor(
        private router: Router,
        private http: Http,
        public snackbar: MatSnackBar
    ) { }

    public ret: any;
    private motherCardONSEMI = 14049476;
    private motherSODEX = 13956496;
    public destAmount: any;

    getBalance(id: number, balanceField: HTMLInputElement) {
        // let account = AccountDetails;
        const urls = 'http://api.sodex.io/api/Ledger/GetBalance?cardNumber=' + id;
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const options = new RequestOptions({ headers: headers });

        this.http.get(urls).subscribe(
            response => {
                balanceField.value = parseInt(response.text(), 10).toString();
            }
        );
    }

    getBalanceDest(id: number, balanceField: HTMLInputElement) {
        const urls = 'http://api.sodex.io/api/Ledger/GetBalance?cardNumber=' + id;
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const options = new RequestOptions({ headers: headers });

        this.http.get(urls).subscribe(
            response => {
                balanceField.value = parseInt(response.text(), 10).toString();
                this.destAmount = parseInt(response.text(), 10).toString();

            }
        );
    }

    openSnackBar(message: string) {
        this.snackbar.open(message, 'Close', {
          duration: 1000
        });
      }

    // updateBalance(): any {
    //     const urls = 'http://api.sodex.io/api/Ledger/GetBalance?cardNumber=' + this.motherSODEX;
    //     const headers = new Headers({ 'Content-Type': 'application/json' });
    //     const options = new RequestOptions({ headers: headers });

    //     this.http.get(urls).subscribe(
    //         response => {
    //             this.ret = parseInt(response.text(), 10).toString();
    //         }
    //     );

    //     return this.ret;
    // }

    // tslint:disable-next-line:max-line-length
    transfer(transData: TransferData, destCard: HTMLInputElement, destBalance: HTMLInputElement, amountId: HTMLInputElement) {
        const url = 'http://api.sodex.io/api/Ledger/Transfer';
        const headers = new Headers({ 'Content-Type': 'application/json' });
        headers.append('Accept', 'application/plain');
        headers.append('Access-Control-Allow-Headers', '*');
        headers.append('Access-Control-Allow-Origin', '*');

        const options = new RequestOptions({ headers: headers });

        this.http.post(url, JSON.stringify(transData), options).subscribe(
            res => {
                // console.log(res);
                // alert(res.text());
                this.openSnackBar(res.text());
                setTimeout(() =>  {
                    destCard.value = '';
                    destBalance.value = '';
                    destCard.focus();
                }, 500);
            },
            err => {
                alert('Error occured');
                console.log('Error occured');
            }
        );
    }
}
